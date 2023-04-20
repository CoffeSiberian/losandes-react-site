import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import NewCard from "../../components/NewCard";
import useFetch from "../../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import EmptyData from "../../components/EmptyData";
import ErrorData from "../../components/ErrorData";
// import PaginationItem from "@mui/material/PaginationItem";

import {
    PROXY_CORS_URL_GET,
    TMP_API_URL,
    COMPANY_ID,
} from "../../helpers/configs";

const News = () => {
    const loaded = useRef(false);
    const firstRender = useRef(true);
    const [NewsResponse, setNewsResponse] = useState(false);
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
        firstRender.current = false;
        if (!loaded.current) {
            getNews();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    const renderNews = () => {
        if (NewsResponse && NewsResponse.length > 0) {
            let newListCopy = JSON.parse(JSON.stringify(NewsResponse));
            newListCopy.sort((a, b) => {
                return new Date(b.published_at) - new Date(a.published_at);
            });
            return newListCopy.map((event) => {
                return (
                    <NewCard
                        key={event.id}
                        title={event.title}
                        content_summary={event.content_summary}
                        author={event.author}
                        published_at={event.published_at}
                        pinned={event.pinned}
                        url={`https://truckersmp.com/`}
                    />
                );
            });
        }
        return <EmptyData msj={"No se encontraron noticias"} />;
    };

    const renderPinnedNews = () => {
        if (NewsResponse && NewsResponse.length > 0) {
            let newListCopy = JSON.parse(JSON.stringify(NewsResponse));
            const pinnedNews = newListCopy.filter((event) => {
                return event.pinned;
            });
            if (pinnedNews.length > 0) {
                return (
                    <>
                        <div className="flex flex-col rounded-lg border-2 border-yellow-500 md:m-4">
                            <Typography
                                className="flex justify-center pb-4 pt-4"
                                component={"div"}
                                color={color}
                                variant="h6"
                            >
                                <b>Destacados</b>
                            </Typography>
                            <div className="grid md:grid-cols-3">
                                {pinnedNews.map((event) => {
                                    return (
                                        <NewCard
                                            key={event.id}
                                            title={event.title}
                                            content_summary={
                                                event.content_summary
                                            }
                                            author={event.author}
                                            published_at={event.published_at}
                                            pinned={event.pinned}
                                            url={`https://truckersmp.com/`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </>
                );
            }
            return <></>;
        }
        return <></>;
    };

    const renderPage = () => {
        return (
            <>
                {renderPinnedNews()}
                <Typography
                    className="flex justify-center pb-4 pt-4"
                    component={"div"}
                    color={color}
                    variant="h6"
                >
                    <b>Lo ultimo</b>
                </Typography>
                <div className="grid md:grid-cols-3">{renderNews()}</div>
                <div className="flex justify-center pb-5">
                    <Stack spacing={2}>
                        <Pagination
                            count={10}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Stack>
                </div>
            </>
        );
    };

    const checkError = () => {
        if (error) {
            return <ErrorData msj={"Error al cargar las noticias"} />;
        } else if (!loading && firstRender.current === false) {
            return renderPage();
        }
    };

    return (
        <>
            <div className="flex justify-center m-2">
                <Typography color={color} variant="h4">
                    <b>Noticias</b>
                </Typography>
            </div>
            {loading && <Typography variant="h4">Loading...</Typography>}
            {checkError()}
        </>
    );
};

export default News;
