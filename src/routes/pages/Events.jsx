import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EventCard from "../../components/EventCard";
import useFetch from "../../hooks/useFetch";

import {
    PROXY_CORS_URL_GET,
    TMP_API_URL,
    COMPANY_ID,
} from "../../helpers/configs";

const Events = () => {
    const loaded = useRef(false);
    const EventsResponse = useRef(false);
    const [FilterEvents, setFilterEvents] = useState(false);

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
            return FilterEvents.map((event) => {
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
        return <Typography>No hay eventos próximos</Typography>;
    };

    return (
        <div className="grid md:grid-cols-3">
            {loading && <Typography variant="h4">Loading...</Typography>}
            {!error && !loading ? renderEvents() : <></>}
        </div>
    );
};

export default Events;
