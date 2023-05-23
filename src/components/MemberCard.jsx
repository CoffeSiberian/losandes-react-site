import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { formatOnlyDate } from "../helpers/formatdate";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";

// icons
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import defaultavatar from "../static/img/defaultavatar.png";

import { REST_API_URL } from "../helpers/configs";

const MemberCard = ({ id, username, roleName, dateJoin, imgLink }) => {
    const [Response, setResponse] = useState(false);
    const loaded = useRef(false);
    const { themeTatailwind } = useDarkMode();

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${REST_API_URL}/getMemberInfo/${id}`,
        "GET",
        {
            "Content-Type": "application/json",
        }
    );

    const getProfileMember = async () => {
        const fetchResponse = await bodyResponse();
        if (fetchResponse.status === 200) {
            setResponse((await fetchResponse.json()).response);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            if (imgLink === undefined) {
                getProfileMember();
            } else {
                setResponse({ avatar: imgLink });
            }
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    const renderTmpProfile = (id) => {
        return (
            <>
                <Typography
                    color={themeTatailwind.secundary.color}
                    variant="caption"
                >
                    En la empresa desde el {formatOnlyDate(dateJoin)}
                </Typography>
                <div className="grid content-end h-full">
                    <Button
                        variant="contained"
                        startIcon={<OpenInNewRoundedIcon />}
                        href={`https://truckersmp.com/user/${id}`}
                        target="_blank"
                    >
                        Ver perfil
                    </Button>
                </div>
            </>
        );
    };

    const renderAvatar = () => {
        return (
            <img
                className="rounded-full w-24 h-24"
                src={Response.avatar}
                alt={username}
            />
        );
    };

    const checkErrorAvatar = () => {
        if (loading || error) {
            return (
                <img
                    className="rounded-full w-24 h-24"
                    src={defaultavatar}
                    alt={username}
                />
            );
        } else if (!loading) {
            return renderAvatar();
        }
    };

    return (
        <div
            className={`flex flex-col ${themeTatailwind.secundary.main} max-w-xs w-full rounded-lg border-2 border-transparent ${themeTatailwind.primary.border_color} shadow-2xl p-4 gap-3`}
        >
            <div className="flex justify-center">{checkErrorAvatar()}</div>
            <div>
                <Typography
                    className="flex justify-center"
                    variant="h6"
                    component="div"
                    color={themeTatailwind.primary.color}
                >
                    <b>{username}</b>
                </Typography>
                <Typography
                    className="flex justify-center pt-1"
                    variant="body2"
                    component="div"
                    color={themeTatailwind.primary.color}
                >
                    {roleName}
                </Typography>
            </div>
            {imgLink === undefined ? renderTmpProfile(id) : <></>}
        </div>
    );
};

export default MemberCard;
