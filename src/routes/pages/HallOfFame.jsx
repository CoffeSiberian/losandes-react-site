import { useEffect, useRef, useState } from "react";
import { HALL_OF_FAME, PROXY_CORS_REST_API_URL } from "../../helpers/configs";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import { Typography } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import ErrorData from "../../components/ErrorData";
import EmptyData from "../../components/EmptyData";
import MemberCard from "../../components/MemberCard";

const HallOfFame = () => {
    const { themeTatailwind } = useDarkMode();
    const [Response, setResponse] = useState([]);
    const loaded = useRef(false);
    const cdnDiscordAvatar = "https://cdn.discordapp.com/avatars/";

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${PROXY_CORS_REST_API_URL}/getHallOfFame`,
        "GET",
        {
            "Content-Type": "application/json",
        }
    );

    const apiResponse = async () => {
        let fetchResponse = await bodyResponse();
        if (fetchResponse.status === 200) {
            setResponse((await fetchResponse.json()).response);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            apiResponse();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    const renderMembers = (rol_id, rol_name) => {
        if (Response.length === 0) {
            return <></>;
        }
        const membersFilter = Response.filter((member) =>
            member.roles.includes(rol_id)
        );
        if (membersFilter.length === 0) return <></>;
        return (
            <div
                className={`flex flex-col rounded-lg border-2 border-yellow-600 md:ml-4 md:mr-4`}
                key={rol_id}
            >
                <Typography
                    component="div"
                    key={rol_id + "name"}
                    className="flex justify-center pt-3"
                    variant="h5"
                    color={themeTatailwind.primary.color}
                >
                    <b>{rol_name}</b>
                </Typography>

                <div
                    key={rol_id + "cards"}
                    className="flex flex-col items-center w-full gap-5 p-6"
                >
                    {membersFilter.map((member) => {
                        return (
                            <MemberCard
                                key={rol_id + "card"}
                                id={member.user.id}
                                username={member.nick}
                                roleName={rol_name}
                                imgLink={`${cdnDiscordAvatar}${member.user.id}/${member.user.avatar}`}
                                dateJoin={member.joined_at}
                            />
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderPage = () => {
        return (
            <>
                <div
                    key="contenHall"
                    className="grid grid-cols-1 md:grid-cols-2 ml-3 mr-3 mb-5 gap-5"
                >
                    {HALL_OF_FAME.map((rol) => {
                        return renderMembers(rol.rol_id, rol.rol_name);
                    })}
                </div>
            </>
        );
    };

    const checkError = () => {
        if (error) {
            return <ErrorData msj={"Error al cargar"} />;
        } else if (!loading) {
            return renderPage();
        }
    };

    return (
        <>
            <div className="flex justify-center m-2">
                <Typography color={themeTatailwind.primary.color} variant="h4">
                    <b>Salon de la fama</b>
                </Typography>
            </div>
            {succes && !loading && Response.length === 0 && (
                <EmptyData key={"contenHallEmpty"} msj="Sin resultados" />
            )}
            {loading && <Typography variant="h4">Loading...</Typography>}
            {checkError()}
        </>
    );
};

export default HallOfFame;
