import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import NewCard from "../../components/NewCard";
import useFetch from "../../hooks/useFetch";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import EmptyData from "../../components/EmptyData";
import ErrorData from "../../components/ErrorData";
import ModalLoading from "../../components/ModalLoading";

import { TITLE, REST_API_URL } from "../../helpers/configs";

const News = () => {
    document.title = TITLE + " | Noticias";
    const loaded = useRef(false);
    const EmptyDataStatus = useRef(false);
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
        `${REST_API_URL}/getNews/`,
        "GET",
        {
            "Content-Type": "application/json",
        }
    );

    const getNews = async () => {
        const fetchResponse = await bodyResponse();
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
            EmptyDataStatus.current = false;
            totalItems.current = NewsResponse.length;
            let newListCopy = JSON.parse(JSON.stringify(NewsResponse));
            newListCopy.sort((a, b) => {
                return new Date(b.published_at) - new Date(a.published_at);
            });
            newListCopy = newListCopy.slice(startIndex, endIndex);
            return newListCopy.map((event) => {
                return (
                    <div
                        key={event.id + "div1"}
                        className="flex justify-center"
                    >
                        <div key={event.id + "div2"} className="flex max-w-lg">
                            <NewCard
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                content_summary={event.content_summary}
                                author={event.author}
                                published_at={event.published_at}
                                pinned={event.pinned}
                            />
                        </div>
                    </div>
                );
            });
        }
        EmptyDataStatus.current = true;
        return <></>;
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
                                component="div"
                                color={themeTatailwind.primary.color}
                                variant="h6"
                            >
                                <b>Destacados</b>
                            </Typography>
                            <div className="grid md:grid-cols-3">
                                {pinnedNews.map((event) => {
                                    return (
                                        <div
                                            key={event.id + "div1"}
                                            className="flex justify-center"
                                        >
                                            <div
                                                key={event.id + "div2"}
                                                className="flex max-w-lg"
                                            >
                                                <NewCard
                                                    id={event.id}
                                                    key={event.id}
                                                    title={event.title}
                                                    content_summary={
                                                        event.content_summary
                                                    }
                                                    author={event.author}
                                                    published_at={
                                                        event.published_at
                                                    }
                                                    pinned={event.pinned}
                                                    url={`https://truckersmp.com/`}
                                                />
                                            </div>
                                        </div>
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
            <ModalLoading open={loading} />
            {checkError()}
            {EmptyDataStatus.current && !error && !loading ? (
                <EmptyData msj={"No hay noticias"} />
            ) : (
                <></>
            )}
        </>
    );
};

export default News;
