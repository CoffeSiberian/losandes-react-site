import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import NewCard from "../../components/NewCard";
import useFetch from "../../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import EmptyData from "../../components/EmptyData";
import ErrorData from "../../components/ErrorData";

import {
    TITLE,
    PROXY_CORS_URL_GET,
    TMP_API_URL,
    COMPANY_ID,
} from "../../helpers/configs";

const News = () => {
    document.title = TITLE + " | Noticias";
    const loaded = useRef(false);
    const totalItems = useRef(0);
    const [NewsResponse, setNewsResponse] = useState(false);
    const { themeTatailwind } = useDarkMode();

    // pagination
    const [page, setPage] = useState(1);
    const handleChange = (event, page) => {
        setPage(page);
    };

    const itemsPerPage = 6; // 6 items per page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

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
            totalItems.current = NewsResponse.length;
            let newListCopy = JSON.parse(JSON.stringify(NewsResponse));
            newListCopy.sort((a, b) => {
                return new Date(b.published_at) - new Date(a.published_at);
            });
            newListCopy = newListCopy.slice(startIndex, endIndex);
            return newListCopy.map((event) => {
                return (
                    <NewCard
                        key={event.id}
                        id={event.id}
                        title={event.title}
                        content_summary={event.content_summary}
                        author={event.author}
                        published_at={event.published_at}
                        pinned={event.pinned}
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
                                color={themeTatailwind.primary.color}
                                variant="h6"
                            >
                                <b>Destacados</b>
                            </Typography>
                            <div className="grid md:grid-cols-3">
                                {pinnedNews.map((event) => {
                                    return (
                                        <NewCard
                                            id={event.id}
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
                    color={themeTatailwind.primary.color}
                    variant="h6"
                >
                    <b>Lo ultimo</b>
                </Typography>
                <div className="grid md:grid-cols-3">{renderNews()}</div>
                <div className="flex justify-center pb-5">
                    <Stack spacing={2}>
                        <Pagination
                            count={Math.ceil(totalItems.current / itemsPerPage)}
                            page={page}
                            onChange={(event, page) =>
                                handleChange(event, page)
                            }
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
        } else if (!loading) {
            return renderPage();
        }
    };

    return (
        <>
            <div className="flex justify-center m-2">
                <Typography color={themeTatailwind.primary.color} variant="h4">
                    <b>Noticias</b>
                </Typography>
            </div>
            {loading && <Typography variant="h4">Loading...</Typography>}
            {checkError()}
        </>
    );
};

export default News;
