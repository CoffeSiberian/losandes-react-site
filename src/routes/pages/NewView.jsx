import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import useFetch from "../../hooks/useFetch";
import ReactMarkdown from "react-markdown";
import { Typography } from "@mui/material";
import ErrorData from "../../components/ErrorData";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import {
    PROXY_CORS_URL_GET,
    TMP_API_URL,
    COMPANY_ID,
} from "../../helpers/configs";

const NewView = () => {
    const { newId } = useParams();

    const loaded = useRef(false);
    const [NewResponse, setNewResponse] = useState(false);
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
            url: `${TMP_API_URL}/vtc/${COMPANY_ID}/news/${newId}`,
            headers: {
                "Content-Type": "application/json",
            },
        };
        let fetchResponse = await bodyResponse(bodyQuery);
        if (fetchResponse.status === 200) {
            setNewResponse((await fetchResponse.json()).response);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            getNews();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    const renderPage = () => {
        return (
            <Typography
                className="flex flex-col p-2 md:p-10 text-justify space-y-1"
                component={"div"}
                color={color}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {NewResponse.content}
                </ReactMarkdown>
            </Typography>
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
        <div>
            {loading && <Typography variant="h4">Loading...</Typography>}
            {checkError()}
        </div>
    );
};

export default NewView;
