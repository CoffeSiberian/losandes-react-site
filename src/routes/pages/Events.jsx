import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import EventCard from "../../components/EventCard";
import useFetch from "../../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import EmptyData from "../../components/EmptyData";
import ErrorData from "../../components/ErrorData";
import ModalLoading from "../../components/ModalLoading";

import { TITLE, REST_API_URL } from "../../helpers/configs";

const Events = () => {
    document.title = TITLE + " | Eventos";
    const loaded = useRef(false);
    const EventsResponse = useRef(false);
    const EmptyDataStatus = useRef(false);

    const totalItems = useRef(0);
    const [FilterEvents, setFilterEvents] = useState(false);

    const { themeTatailwind } = useDarkMode();

    // pagination
    const [page, setPage] = useState(1);
    const handleChange = (event, page) => {
        setPage(page);
    };

    const itemsPerPage = 9; // 6 items per page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${REST_API_URL}/getEvents/`,
        "GET",
        {
            "Content-Type": "application/json",
        }
    );

    const getEvents = async () => {
        const fetchResponse = await bodyResponse();
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
            EmptyDataStatus.current = false;
            totalItems.current = FilterEvents.length;
            const eventListCopy = FilterEvents.slice(startIndex, endIndex);
            return eventListCopy.map((event, index) => {
                if (index === 0 && startIndex === 0) {
                    return nextEvent();
                }
                return (
                    <div
                        key={event.id + "div1"}
                        className="flex justify-center"
                    >
                        <div key={event.id + "div2"} className="flex max-w-xl">
                            <EventCard
                                key={event.id}
                                img={event.banner}
                                rute_img={event.map}
                                description={event.description}
                                name={event.name}
                                date={event.start_at}
                                game={event.game}
                                server={event.server.name}
                                atendence={event.attendances.confirmed}
                                atendenceVtc={event.attendances.vtcs}
                                url={`https://truckersmp.com${event.url}`}
                            />
                        </div>
                    </div>
                );
            });
        }
        EmptyDataStatus.current = true;
        return <></>;
    };

    const nextEvent = () => {
        if (FilterEvents && FilterEvents.length > 0) {
            let event = FilterEvents[0];
            return (
                <div key={event.id + "div1"} className="flex justify-center">
                    <div
                        key={event.id + "div2"}
                        className="flex flex-col max-w-xl rounded-lg border-2 border-yellow-500 md:m-1"
                    >
                        <Typography
                            color={themeTatailwind.primary.color}
                            className="flex justify-center p-1"
                            variant="h6"
                        >
                            <b>Proximo evento</b>
                        </Typography>
                        <EventCard
                            key={event.id}
                            img={event.banner}
                            rute_img={event.map}
                            description={event.description}
                            name={event.name}
                            date={event.start_at}
                            game={event.game}
                            server={event.server.name}
                            atendence={event.attendances.confirmed}
                            atendenceVtc={event.attendances.vtcs}
                            url={`https://truckersmp.com${event.url}`}
                        />
                    </div>
                </div>
            );
        }
        return <></>;
    };
    const renderPage = () => {
        return (
            <>
                <div className="grid md:grid-cols-3">{renderEvents()}</div>
                {EmptyDataStatus.current && !error && !loading ? (
                    <></>
                ) : (
                    <div className="flex justify-center pb-5">
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(
                                    totalItems.current / itemsPerPage
                                )}
                                page={page}
                                onChange={(event, page) =>
                                    handleChange(event, page)
                                }
                                variant="outlined"
                                shape="rounded"
                            />
                        </Stack>
                    </div>
                )}
            </>
        );
    };

    const checkError = () => {
        if (error) {
            return <ErrorData msj={"Error al cargar los eventos"} />;
        } else if (!loading) {
            return renderPage();
        }
    };

    return (
        <>
            <div className="flex justify-center m-2">
                <Typography color={themeTatailwind.primary.color} variant="h4">
                    <b>Eventos oficiales</b>
                </Typography>
            </div>

            <ModalLoading open={loading} />
            {checkError()}
            {EmptyDataStatus.current && !error && !loading ? (
                <EmptyData msj={"No hay eventos próximos"} />
            ) : (
                <></>
            )}
        </>
    );
};

export default Events;
