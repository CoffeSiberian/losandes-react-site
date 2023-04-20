import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EventCard from "../../components/EventCard";
import useFetch from "../../hooks/useFetch";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import EmptyData from "../../components/EmptyData";
import ErrorData from "../../components/ErrorData";

import {
    PROXY_CORS_URL_GET,
    TMP_API_URL,
    COMPANY_ID,
} from "../../helpers/configs";

const Events = () => {
    const loaded = useRef(false);
    const EventsResponse = useRef(false);
    const [FilterEvents, setFilterEvents] = useState(false);

    const { darkMode } = useDarkMode();
    const color = darkMode ? "white" : "black";

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${PROXY_CORS_URL_GET}`,
        "POST",
        {
            "Content-Type": "application/json",
        }
    );

    const getEvents = async () => {
        let bodyQuery = {
            url: `${TMP_API_URL}/vtc/${COMPANY_ID}/events`,
            headers: {
                "Content-Type": "application/json",
            },
        };
        let fetchResponse = await bodyResponse(bodyQuery);
        if (fetchResponse.status === 200) {
            EventsResponse.current = await fetchResponse.json();
            orderEvents();
            return true;
        }
        return false;
    };

    const orderEvents = () => {
        if (EventsResponse.current) {
            let eventsList = JSON.parse(
                JSON.stringify(EventsResponse.current.response)
            );
            let empyEvents = [];
            eventsList.map((event) => {
                if (new Date() < new Date(event.start_at)) {
                    empyEvents.push(event);
                }
                return event;
            });
            empyEvents.sort((a, b) => {
                return new Date(a.start_at) - new Date(b.start_at);
            });
            setFilterEvents(empyEvents);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            getEvents();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    const renderEvents = () => {
        if (FilterEvents && FilterEvents.length > 0) {
            return FilterEvents.map((event, index) => {
                if (index === 0) {
                    return nextEvent();
                }
                return (
                    <EventCard
                        key={event.id}
                        img={event.banner}
                        name={event.name}
                        date={event.start_at}
                        game={event.game}
                        server={event.server.name}
                        atendence={event.attendances.confirmed}
                        atendenceVtc={event.attendances.vtcs}
                        url={`https://truckersmp.com/${event.url}`}
                    />
                );
            });
        }
        return <EmptyData msj={"No hay eventos próximos"} />;
    };

    const nextEvent = () => {
        if (FilterEvents && FilterEvents.length > 0) {
            let event = FilterEvents[0];
            return (
                <>
                    <div
                        key={event.id}
                        className="flex flex-col rounded-lg border-2 border-yellow-500 md:m-1"
                    >
                        <Typography
                            className="flex justify-center pt-1"
                            component={"div"}
                            color={color}
                            variant="h6"
                        >
                            <b>Proximo evento</b>
                        </Typography>
                        <EventCard
                            img={event.banner}
                            name={event.name}
                            date={event.start_at}
                            game={event.game}
                            server={event.server.name}
                            atendence={event.attendances.confirmed}
                            atendenceVtc={event.attendances.vtcs}
                            url={`https://truckersmp.com/${event.url}`}
                        />
                    </div>
                </>
            );
        }
        return <></>;
    };

    const renderPage = () => {
        return (
            <>
                <div className="grid md:grid-cols-3">{renderEvents()}</div>
            </>
        );
    };

    const checkError = () => {
        if (error) {
            return <ErrorData msj={"Error al cargar las noticias"} />;
        } else if (!loading) {
            return renderPage();
        }
    };

    return (
        <>
            <div className="flex justify-center m-2">
                <Typography color={color} variant="h4">
                    <b>Eventos oficiales</b>
                </Typography>
            </div>
            {loading && <Typography variant="h4">Loading...</Typography>}
            {checkError()}
        </>
    );
};

export default Events;
