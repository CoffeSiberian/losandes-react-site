import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { formatDate } from "../helpers/formatdate";

// icons
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
//

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
    const { themeTatailwind } = useDarkMode();

    return (
        <div
            className={`flex flex-col ${themeTatailwind.secundary.main} rounded-lg border-2 border-transparent hover:border-[${themeTatailwind.primary.border_color}] shadow-2xl m-4 mb-12 p-4`}
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
                    color={themeTatailwind.primary.color}
                    target="_blank"
                    underline="none"
                >
                    <Typography variant="h6">{name}</Typography>
                </Link>
                <Divider />
                <Typography
                    component={"div"}
                    className="pt-2"
                    color={themeTatailwind.primary.color}
                    variant="body1"
                >
                    <div className="flex">
                        <CalendarMonthRoundedIcon className="mr-2" />
                        <div>
                            <b className="mr-2">Fecha:</b>
                            {formatDate(date)}
                        </div>
                    </div>
                    <div className="flex">
                        <SportsEsportsRoundedIcon className="mr-2" />
                        <b className="mr-2">Juego:</b>
                        {game}
                    </div>
                    <div className="flex">
                        <StorageRoundedIcon className="mr-2" />
                        <b className="mr-2">Server:</b>
                        {server}
                    </div>
                </Typography>
                <Typography
                    color={themeTatailwind.primary.color}
                    component={"div"}
                    className="flex justify-center pb-2 pt-2"
                    variant="h6"
                >
                    Asistencia
                </Typography>
                <Divider />
                <Typography
                    component={"div"}
                    className="pt-2"
                    color={themeTatailwind.primary.color}
                    variant="body1"
                >
                    <div className="flex">
                        <PeopleRoundedIcon className="mr-2" />
                        <b className="mr-2">Jugadores:</b> {atendence}
                    </div>
                    <div className="flex">
                        <LocalShippingRoundedIcon className="mr-2" />
                        <b className="mr-2">VTC's:</b> {atendenceVtc}
                    </div>
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
