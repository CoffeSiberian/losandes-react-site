import { useEffect, useRef, useState } from "react";
import { Typography, SvgIcon } from "@mui/material";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import useFetch from "../hooks/useFetch";
import { REST_API_URL } from "../helpers/configs";
import Divider from "@mui/material/Divider";
import SmallMemberCard from "./SmallMemberCard";

// icons
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

const Statistics = () => {
    const loaded = useRef(false);

    const [StatisticsResponse, setStatisticsResponse] = useState();
    const { themeTatailwind } = useDarkMode();

    const discordSvg = (
        <SvgIcon>
            <path d="m13.93 11.4c-.054.633-.582 1.127-1.224 1.127-.678 0-1.229-.55-1.229-1.229s.55-1.229 1.228-1.229c.683.029 1.225.59 1.225 1.277 0 .019 0 .037-.001.056v-.003zm-5.604-1.33c-.688.061-1.223.634-1.223 1.332s.535 1.271 1.218 1.332h.005c.683-.029 1.225-.59 1.225-1.277 0-.019 0-.037-.001-.056v.003c.001-.02.002-.043.002-.067 0-.685-.541-1.243-1.219-1.269h-.002zm12.674-7.598v21.528c-3.023-2.672-2.057-1.787-5.568-5.052l.636 2.22h-13.609c-1.359-.004-2.46-1.106-2.46-2.466 0-.002 0-.004 0-.006v-16.224c0-.002 0-.004 0-.006 0-1.36 1.101-2.462 2.459-2.466h16.081c1.359.004 2.46 1.106 2.46 2.466v.006zm-3.42 11.376c-.042-2.559-.676-4.96-1.77-7.086l.042.09c-.924-.731-2.088-1.195-3.358-1.259l-.014-.001-.168.192c1.15.312 2.15.837 3.002 1.535l-.014-.011c-1.399-.769-3.066-1.222-4.839-1.222-1.493 0-2.911.321-4.189.898l.064-.026c-.444.204-.708.35-.708.35.884-.722 1.942-1.266 3.1-1.56l.056-.012-.12-.144c-1.284.065-2.448.529-3.384 1.269l.012-.009c-1.052 2.036-1.686 4.437-1.728 6.982v.014c.799 1.111 2.088 1.826 3.543 1.826.041 0 .082-.001.123-.002h-.006s.444-.54.804-.996c-.866-.223-1.592-.727-2.093-1.406l-.007-.01c.176.124.468.284.49.3 1.209.672 2.652 1.067 4.188 1.067 1.191 0 2.326-.238 3.36-.668l-.058.021c.528-.202.982-.44 1.404-.723l-.025.016c-.526.703-1.277 1.212-2.144 1.423l-.026.005c.36.456.792.972.792.972.033.001.072.001.111.001 1.461 0 2.755-.714 3.552-1.813l.009-.013z" />
        </SvgIcon>
    );

    // eslint-disable-next-line
    const [loading, error, succes, bodyResponse] = useFetch(
        `${REST_API_URL}/getsummary/`,
        "GET",
        {
            "Content-Type": "application/json",
        }
    );

    const getStatistics = async () => {
        const fetchResponse = await bodyResponse();
        if (fetchResponse.status === 200) {
            const data = await fetchResponse.json();
            setStatisticsResponse(data);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            getStatistics();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    const renderStatistics = () => {
        const classStyle = `flex flex-col ${themeTatailwind.secundary.main_contrast} shadow-2xl w-full max-w-xs items-center border-2 border-green-600 rounded-xl gap-2 p-4`;
        return (
            <div className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5 items-center md:justify-center">
                    <div className={classStyle}>
                        <div className="flex flex-col items-center gap-1">
                            <Typography color={themeTatailwind.primary.color}>
                                <PersonAddRoundedIcon fontSize="medium" />
                            </Typography>
                            <Typography
                                variant="h6"
                                color={themeTatailwind.primary.color}
                            >
                                Ultimo recluta en la VTC
                            </Typography>
                        </div>
                        <Divider className="w-full" component="div" />
                        {StatisticsResponse.last_member !== null ? (
                            <SmallMemberCard
                                username={StatisticsResponse.last_member.name}
                                imgLink={StatisticsResponse.last_member.avatar}
                                id={StatisticsResponse.last_member.id}
                            />
                        ) : (
                            <Typography
                                color={themeTatailwind.primary.color}
                                variant="caption"
                                className="text-center"
                                component="div"
                            >
                                No se encontró al nuevo recluta 😢
                            </Typography>
                        )}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5 items-center md:justify-center">
                    <div className={classStyle}>
                        <div className="flex flex-col items-center gap-1">
                            <Typography color={themeTatailwind.primary.color}>
                                <LocalShippingRoundedIcon fontSize="medium" />
                            </Typography>
                            <Typography
                                variant="h6"
                                color={themeTatailwind.primary.color}
                            >
                                N° de Conductores
                            </Typography>
                        </div>
                        <Divider className="w-full" component="div" />
                        <Typography
                            color={themeTatailwind.primary.color}
                            variant="h5"
                            className="text-center"
                            component="div"
                        >
                            <b>{StatisticsResponse.vtc_members}</b>
                        </Typography>
                    </div>
                    <div className={classStyle}>
                        <div className="flex flex-col items-center gap-1">
                            <Typography color={themeTatailwind.primary.color}>
                                {discordSvg}
                            </Typography>
                            <Typography
                                variant="h6"
                                color={themeTatailwind.primary.color}
                            >
                                Miembros en Discord
                            </Typography>
                        </div>
                        <Divider className="w-full" component="div" />
                        <Typography
                            color={themeTatailwind.primary.color}
                            variant="h5"
                            className="text-center"
                            component="div"
                        >
                            <b>{StatisticsResponse.discord_members}</b>
                        </Typography>
                    </div>
                    <div className={classStyle}>
                        <div className="flex flex-col items-center gap-1">
                            <Typography color={themeTatailwind.primary.color}>
                                <AssignmentIndRoundedIcon fontSize="medium" />
                            </Typography>
                            <Typography
                                variant="h6"
                                color={themeTatailwind.primary.color}
                            >
                                Staff Activo
                            </Typography>
                        </div>
                        <Divider className="w-full" component="div" />
                        <Typography
                            color={themeTatailwind.primary.color}
                            variant="h5"
                            className="text-center"
                            component="div"
                        >
                            <b>{StatisticsResponse.staff_members}</b>
                        </Typography>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="flex justify-center mb-10">
            <div
                className={`flex flex-col justify-center ${themeTatailwind.secundary.main} rounded-lg shadow-sm w-full max-w-7xl gap-4 m-5 p-5`}
            >
                <Typography
                    color={themeTatailwind.primary.color}
                    component="div"
                    className="flex items-center justify-center gap-2"
                    variant="h4"
                >
                    <QueryStatsRoundedIcon fontSize="large" />
                    <b>Estadisticas</b>
                </Typography>
                <Divider />
                {StatisticsResponse !== undefined ? (
                    renderStatistics()
                ) : (
                    <Typography
                        color={themeTatailwind.primary.color}
                        variant="caption"
                        className="text-center"
                        component="div"
                    >
                        No se encontraron estadisticas 😢
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default Statistics;
