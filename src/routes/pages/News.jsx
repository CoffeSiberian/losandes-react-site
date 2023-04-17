import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import NewCard from "../../components/NewCard";
import useFetch from "../../hooks/useFetch";

import {
    PROXY_CORS_URL_GET,
    TMP_API_URL,
    COMPANY_ID,
} from "../../helpers/configs";

const News = () => {
    const loaded = useRef(false);
    const [NewsResponse, setNewsResponse] = useState(false);

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${PROXY_CORS_URL_GET}`,
        "POST",
        {
            "Content-Type": "application/json",
        }
    );

    const getNews = async () => {
        let bodyQuery = {
            url: `${TMP_API_URL}/vtc/${COMPANY_ID}/news`,
            headers: {
                "Content-Type": "application/json",
            },
        };
        let fetchResponse = await bodyResponse(bodyQuery);
        if (fetchResponse.status === 200) {
            setNewsResponse((await fetchResponse.json()).response.news);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            getNews();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    const renderNews = () => {
        if (NewsResponse && NewsResponse.length > 0) {
            console.log(NewsResponse);
            return NewsResponse.map((event) => {
                return (
                    <NewCard
                        key={event.id}
                        title={event.title}
                        content_summary={event.content_summary}
                        author={event.author}
                        published_at={event.published_at}
                        url={`https://truckersmp.com/`}
                    />
                );
            });
        }
        return <Typography>No hay eventos próximos</Typography>;
    };

    return (
        <div className="grid md:grid-cols-3">
            {loading && <Typography variant="h4">Loading...</Typography>}
            {!error && !loading ? renderNews() : <></>}
        </div>
    );
};

export default News;
