import useFetch from "../../hooks/useFetch";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import ErrorData from "../../components/ErrorData";
import EmptyData from "../../components/EmptyData";
import MemberCard from "../../components/MemberCard";
import { HALL_OF_FAME, PROXY_CORS_REST_API_URL } from "../../helpers/configs";

const HallOfFame = () => {
    const { themeTatailwind } = useDarkMode();
    const [Response, setResponse] = useState(false);
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
        if (!Response || Response.length === 0) return <EmptyData />;
        const membersFilter = Response.filter((member) =>
            member.roles.includes(rol_id)
        );
        if (membersFilter.length === 0) return <></>;
        return membersFilter.map((member) => {
            return (
                <MemberCard
                    key={member.user.id}
                    id={member.user.id}
                    username={member.nick}
                    roleName={rol_name}
                    imgLink={`${cdnDiscordAvatar}${member.user.id}/${member.user.avatar}`}
                    dateJoin={member.joined_at}
                />
            );
        });
    };

    const renderPage = () => {
        return (
            <div key="contenHall" className="grid md:grid-cols-3">
                {HALL_OF_FAME.map((rol) => {
                    return renderMembers(rol.rol_id, rol.rol_name);
                })}
            </div>
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
                    <b>Salon de la fama</b>
                </Typography>
            </div>
            {loading && <Typography variant="h4">Loading...</Typography>}
            {checkError()}
        </>
    );
};

export default HallOfFame;
