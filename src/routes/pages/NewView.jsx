import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import useFetch from "../../hooks/useFetch";
import ReactMarkdown from "react-markdown";
import { Typography } from "@mui/material";
import ErrorData from "../../components/ErrorData";
import remarkGfm from "remark-gfm";
import Button from "@mui/material/Button";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import remarkBreaks from "remark-breaks";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { formatOnlyDate } from "../../helpers/formatdate";
import Divider from "@mui/material/Divider";
import ModalLoading from "../../components/ModalLoading";
import "../../static/css/NewViewStyle.scss";
import { TITLE, REST_API_URL } from "../../helpers/configs";

const NewView = () => {
    const { newId } = useParams();

    const loaded = useRef(false);
    const oldId = useRef(newId);
    const [NewResponse, setNewResponse] = useState(false);
    const { themeTatailwind } = useDarkMode();
    const navigate = useNavigate();

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${REST_API_URL}/getNew/${newId}`,
        "GET",
        {
            "Content-Type": "application/json",
        }
    );

    const getNews = async () => {
        const fetchResponse = await bodyResponse();
        if (fetchResponse.status === 200) {
            setNewResponse((await fetchResponse.json()).response);
        }
    };

    const idChange = () => {
        if (oldId.current !== newId) {
            getNews();
            oldId.current = newId;
        }
    };

    useEffect(() => {
        idChange();
        if (!loaded.current) {
            getNews();
            loaded.current = true;
        } // eslint-disable-next-line
    }, [newId]);

    const renderInfo = () => {
        document.title = NewResponse
            ? `${TITLE} | ${NewResponse.title}`
            : TITLE;
        return (
            <div className="pt-4 pb-4">
                <Typography
                    component={"div"}
                    className="flex h-full w-full"
                    color={themeTatailwind.primary.color}
                    variant="caption"
                >
                    <div className="flex w-full self-center items-end">
                        <PersonRoundedIcon
                            sx={{ width: 21, height: 21 }}
                            className="mr-2"
                        />
                        {NewResponse.author}
                    </div>
                    <Typography
                        className="hidden md:flex w-full justify-center"
                        component={"div"}
                        variant="h6"
                        color={themeTatailwind.primary.color}
                    >
                        <b>{NewResponse.title}</b>
                    </Typography>
                    <div className="flex w-full self-center items-end justify-end">
                        <CalendarMonthRoundedIcon
                            sx={{ width: 21, height: 21 }}
                            className="mr-2"
                        />
                        {formatOnlyDate(NewResponse.published_at)}
                    </div>
                </Typography>
                <Divider className="pt-5" variant="middle" />
            </div>
        );
    };

    const renderPage = () => {
        return (
            <>
                <Typography
                    className="flex md:hidden w-full justify-center"
                    component={"div"}
                    variant="h6"
                    color={themeTatailwind.primary.color}
                >
                    <b>{NewResponse.title}</b>
                </Typography>
                <div className="flex flex-col p-2 md:p-10">
                    {renderInfo()}
                    <div className="pb-4 pt-3">
                        <Button
                            variant="contained"
                            startIcon={<ArrowBackRoundedIcon />}
                            onClick={() => navigate("/news")}
                        >
                            Regresar
                        </Button>
                    </div>
                    <Typography
                        className="text-justify space-y-1"
                        component={"div"}
                        color={themeTatailwind.primary.color}
                        variant="body1"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                        >
                            {NewResponse.content}
                        </ReactMarkdown>
                    </Typography>
                </div>
            </>
        );
    };

    const checkError = () => {
        if (error) {
            return <ErrorData msj={"Error al cargar la noticia"} />;
        } else if (!loading) {
            return <div className="viewNew">{renderPage()}</div>;
        }
    };

    return (
        <>
            {<ModalLoading open={loading} />}
            {checkError()}
        </>
    );
};

export default NewView;
