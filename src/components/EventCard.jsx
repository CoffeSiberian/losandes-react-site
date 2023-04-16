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
    const { darkMode } = useDarkMode();
    const color = darkMode ? "white" : "black";

    return (
        <div
            className={`flex flex-col rounded-lg border-2 border-transparent hover:border-[#3ca9d0] shadow-2xl m-4 mb-12 p-4"`}
        >
            <img
                className="object-cover rounded-lg drop-shadow-lg"
                src={img}
                alt="Los Andes VTC logo"
            />
            <div className="grid p-3">
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
                <Typography color={color} variant="body1">
                    <b>Fecha:</b> {date}
                    <br />
                    <b>Juego:</b> {game}
                    <br />
                    <b>Server:</b> {server}
                </Typography>
                <Typography
                    color={color}
                    className="flex justify-center"
                    variant="h6"
                >
                    Asistencia
                </Typography>
                <Divider />
                <Typography color={color} variant="body1">
                    <b>Jugadores:</b> {atendence}
                    <br />
                    <b>VTC's:</b> {atendenceVtc}
                </Typography>

                <Button
                    variant="contained"
                    endIcon={<OpenInNewRoundedIcon />}
                    href={url}
                    target="_blank"
                >
                    Mas Informacion
                </Button>
            </div>
        </div>
    );
};

export default EventCard;
