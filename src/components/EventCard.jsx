import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

const EventCard = ({
    img,
    name,
    date,
    game,
    server,
    atendence,
    atendenceVtc,
    url,
}) => {
    const { darkMode, themeTatailwind } = useDarkMode();
    const color = darkMode ? "white" : "black";

    return (
        <div
            className={`flex flex-col ${themeTatailwind.secundary.main} rounded-lg border-2 border-transparent hover:border-[#3ca9d0] shadow-2xl m-4 mb-12 p-4`}
        >
            <img
                className="object-cover rounded-lg drop-shadow-lg"
                src={img}
                alt="Los Andes VTC logo"
            />
            <div className="flex flex-col pb-2">
                <Link
                    className="flex justify-center p-2"
                    href={url}
                    color={color}
                    target="_blank"
                    underline="none"
                >
                    <Typography variant="h6">{name}</Typography>
                </Link>
                <Divider />
                <Typography className="pt-2" color={color} variant="body1">
                    <b>Fecha:</b> {date}
                    <br />
                    <b>Juego:</b> {game}
                    <br />
                    <b>Server:</b> {server}
                </Typography>
                <Typography
                    color={color}
                    className="flex justify-center pb-2"
                    variant="h6"
                >
                    Asistencia
                </Typography>
                <Divider />
                <Typography className="pb-2" color={color} variant="body1">
                    <b>Jugadores:</b> {atendence}
                    <br />
                    <b>VTC's:</b> {atendenceVtc}
                </Typography>
            </div>
            <div className="grid content-end h-full">
                <Button
                    variant="contained"
                    endIcon={<OpenInNewRoundedIcon />}
                    href={url}
                    target="_blank"
                >
                    Más información
                </Button>
            </div>
        </div>
    );
};

export default EventCard;
