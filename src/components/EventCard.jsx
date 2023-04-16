import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

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
    return (
        <div className="flex flex-col rounded-lg border-2 shadow-2xl m-4 mb-12 p-4">
            <img
                className="object-cover rounded-lg drop-shadow-lg"
                src={img}
                alt="Los Andes VTC logo"
            />
            <div className="grid p-2">
                <Link
                    className="flex justify-center items-center p-2"
                    href={url}
                    target="_blank"
                    underline="none"
                >
                    <Typography variant="h6">{name}</Typography>
                </Link>
                <Typography variant="body1">{date}</Typography>
                <Typography variant="body1">{game}</Typography>
                <Typography variant="body1">{server}</Typography>
                <Typography variant="body1">{atendence}</Typography>
                <Typography variant="body1">{atendenceVtc}</Typography>
            </div>
        </div>
    );
};

export default EventCard;
