import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { formatOnlyDate } from "../helpers/formatdate";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";

// icons
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import defaultavatar from "../static/img/defaultavatar.png";

import { PROXY_CORS_URL_GET, TMP_API_URL } from "../helpers/configs";

const StaffCard = ({ id, username, roleName, dateJoin }) => {
    const [Response, setResponse] = useState(false);
    const loaded = useRef(false);
    const { themeTatailwind } = useDarkMode();

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${PROXY_CORS_URL_GET}`,
        "POST",
        {
            "Content-Type": "application/json",
        }
    );

    const getProfileMember = async () => {
        let bodyQuery = {
            url: `${TMP_API_URL}/player/${id}`,
            headers: {
                "Content-Type": "application/json",
            },
        };
        let fetchResponse = await bodyResponse(bodyQuery);
        if (fetchResponse.status === 200) {
            setResponse((await fetchResponse.json()).response);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            getProfileMember();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

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
        if (error) {
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
            className={`flex flex-col ${themeTatailwind.secundary.main} rounded-lg border-2 border-transparent hover:border-[${themeTatailwind.primary.border_color}] w-96 shadow-2xl m-4 mb-12 p-4 gap-3`}
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
        </div>
    );
};

export default StaffCard;