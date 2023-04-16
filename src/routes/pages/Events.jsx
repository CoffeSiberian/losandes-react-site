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
    const [Events, setEvents] = useState(false);

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
            return setEvents(await fetchResponse.json());
        }
        return setEvents(false);
    };

    useEffect(() => {
        if (!loaded.current) {
            getEvents();
        } // eslint-disable-next-line
    }, []);

    const renderEvents = () => {
        if (Events) {
            return Events.response.map((event) => {
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
        return <p>no events</p>;
    };

    return (
        <div className="grid md:grid-cols-3">
            {loading && <Typography variant="h4">Loading...</Typography>}
            {!error && !loading ? renderEvents() : <></>}
        </div>
    );
};

export default Events;
