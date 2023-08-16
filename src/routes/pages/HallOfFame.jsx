import { useEffect, useRef, useState } from "react";
import { TITLE, HALL_OF_FAME, REST_API_URL } from "../../helpers/configs";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import useFetch from "../../hooks/useFetch";
import ErrorData from "../../components/ErrorData";
import EmptyData from "../../components/EmptyData";
import MemberCard from "../../components/MemberCard";
import ModalLoading from "../../components/ModalLoading";

const HallOfFame = () => {
    document.title = TITLE + " | Salón de la fama";
    const { themeTatailwind } = useDarkMode();
    const [Response, setResponse] = useState([]);
    const loaded = useRef(false);
    const cdnDiscordAvatar = "https://cdn.discordapp.com/avatars/";

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${REST_API_URL}/getHallOfFame`,
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

    const renderMember = (rol_name, membersFilter) => {
        return membersFilter.map((member) => {
            return (
                <MemberCard
                    key={member.user.id + "card" + rol_name}
                    id={member.user.id}
                    username={member.nick}
                    roleName={rol_name}
                    imgLink={`${cdnDiscordAvatar}${member.user.id}/${member.user.avatar}`}
                    dateJoin={member.joined_at}
                />
            );
        });
    };

    const renderSingleMemberSection = (membersCards) => {
        if (membersCards.length === 0) return <></>;
        return (
            <div className="rounded-lg border-2 border-yellow-600">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center m-4 gap-8 p-2">
                    {membersCards.map((member) => {
                        if (member === null) return <></>;
                        return member;
                    })}
                </div>
            </div>
        );
    };

    const renderMultiMemberSection = (membersCards) => {
        if (membersCards.length === 0) return <></>;
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center m-4 gap-8 p-2">
                {membersCards.map((member) => {
                    if (member === null) return <></>;
                    return member;
                })}
            </div>
        );
    };

    const renderFeaturedMemberSection = (membersCards) => {
        if (membersCards.length === 0) return <></>;
        return (
            <div className="rounded-lg border-2 border-pink-400">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center m-4 gap-8 p-2">
                    {membersCards.map((member) => {
                        if (member === null) return <></>;
                        return member;
                    })}
                </div>
            </div>
        );
    };

    const renderMembers = (rol_id, rol_name, featured) => {
        /*
        return boxMember and boolean if is multi members or null if not members found
        */

        if (Response.length === 0) return null;

        const membersFilter = Response.filter((member) => {
            const include = member.roles.includes(rol_id);
            if (member.featured && featured && include) return true;
            return include;
        });

        if (membersFilter.length === 0) return null;
        if (featured) {
            return {
                jsx: renderMember(rol_name, membersFilter),
                multi: false,
            };
        }

        if (membersFilter.length === 1) {
            return {
                jsx: renderMember(rol_name, membersFilter),
                multi: false,
            };
        } else {
            return {
                jsx: renderMember(rol_name, membersFilter),
                multi: true,
            };
        }
    };

    const renderPage = () => {
        let membersCards = {
            single: [],
            multi: [],
            featured: [],
        };

        HALL_OF_FAME.map((rol) => {
            let members = renderMembers(rol.rol_id, rol.rol_name, rol.featured);
            if (members === null) return null;

            if (rol.featured) {
                return membersCards.featured.push(members.jsx);
            }
            if (members.multi) {
                return membersCards.multi.push(members.jsx);
            }
            if (!members.multi) {
                return membersCards.single.push(members.jsx);
            }
            return null;
        });

        return (
            <div className="flex flex-col ml-3 mr-3 mb-5 gap-5">
                {renderFeaturedMemberSection(membersCards.featured)}
                {renderSingleMemberSection(membersCards.single)}
                <Divider variant="middle" />
                {renderMultiMemberSection(membersCards.multi)}
            </div>
        );
    };

    const checkError = () => {
        if (error) {
            return <ErrorData msj={"Error al cargar"} />;
        } else if (!loading && succes) {
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
            <ModalLoading open={loading} />
            {checkError()}
        </>
    );
};

export default HallOfFame;
