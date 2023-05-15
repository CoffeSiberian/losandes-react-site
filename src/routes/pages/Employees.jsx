import { useEffect, useState, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import MemberCard from "../../components/MemberCard";
import ErrorData from "../../components/ErrorData";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
    TITLE,
    PROXY_CORS_URL_GET,
    TMP_API_URL,
    COMPANY_ID,
} from "../../helpers/configs";

const Employees = () => {
    document.title = TITLE + " | Miembros";
    const [Response, setResponse] = useState(false);
    const loaded = useRef(false);
    const totalItems = useRef(0);
    const { themeTatailwind } = useDarkMode();

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${PROXY_CORS_URL_GET}`,
        "POST",
        {
            "Content-Type": "application/json",
        }
    );

    // pagination
    const [page, setPage] = useState(1);
    const handleChange = (event, page) => {
        setPage(page);
    };

    const itemsPerPage = 12; // 12 items per page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const getMembers = async () => {
        let bodyQuery = {
            url: `${TMP_API_URL}/vtc/${COMPANY_ID}/members`,
            headers: {
                "Content-Type": "application/json",
            },
        };
        let fetchResponse = await bodyResponse(bodyQuery);
        if (fetchResponse.status === 200) {
            setResponse((await fetchResponse.json()).response.members);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            getMembers();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    const renderPage = () => {
        if (!Response) return <></>;
        totalItems.current = Response.length;
        let newListCopy = JSON.parse(JSON.stringify(Response));
        newListCopy = newListCopy.slice(startIndex, endIndex);
        return (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 self-center gap-10 md:gap-8 p-3">
                    {newListCopy.map((member) => {
                        return (
                            <MemberCard
                                key={member.id}
                                id={member.user_id}
                                username={member.username}
                                roleName={member.role}
                                dateJoin={member.joinDate}
                            />
                        );
                    })}
                </div>
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
            return <ErrorData msj={"Error al cargar los miembros"} />;
        } else if (!loading) {
            return renderPage();
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-center m-2">
                <Typography color={themeTatailwind.primary.color} variant="h4">
                    <b>Nuestros Empleados</b>
                </Typography>
            </div>
            {loading && <Typography variant="h4">Loading...</Typography>}

            {checkError()}
        </div>
    );
};

export default Employees;
