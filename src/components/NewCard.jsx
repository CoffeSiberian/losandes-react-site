import { Typography } from "@mui/material";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { formatOnlyDate } from "../helpers/formatdate";

// icons
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
//

const NewCard = ({
    id,
    img,
    title,
    pinned,
    author,
    published_at,
    content_summary,
}) => {
    const navigate = useNavigate();
    const { themeTatailwind } = useDarkMode();

    return (
        <div className="flex relative">
            {pinned ? (
                <div className="flex absolute -rotate-45">
                    <PushPinRoundedIcon color={"info"} fontSize={"large"} />
                </div>
            ) : (
                <></>
            )}
            <div
                className={`flex flex-col ${themeTatailwind.secundary.main} w-full rounded-lg border-2 border-transparent ${themeTatailwind.primary.border_color} shadow-2xl m-4 mb-12 p-4`}
            >
                {/*
                en planificacion para poner una imagen de fondo
                <img
                    className="object-cover rounded-lg drop-shadow-lg"
                    src="https://static.truckersmp.com/images/event/cover/14653.1678403142.jpeg"
                    alt="Los Andes VTC logo"
                />
            */}
                <div className="flex flex-col h-full pb-2">
                    <div>
                        <Typography
                            color={themeTatailwind.primary.color}
                            variant="h6"
                        >
                            {title}
                        </Typography>
                        <Divider />
                    </div>
                    <div className="flex pt-2">
                        <Typography
                            component={"div"}
                            color={themeTatailwind.primary.color}
                            variant="subtitle2"
                        >
                            <div>{content_summary}</div>
                        </Typography>
                    </div>
                    <div className="grid content-end h-full pt-3">
                        <div className="flex justify-end">
                            <Button
                                variant="contained"
                                endIcon={<AddRoundedIcon />}
                                onClick={() => navigate(`/news/${id}`)}
                            >
                                Leer mas
                            </Button>
                        </div>
                        <div className="flex h-full w-full pt-3">
                            <Typography
                                component={"div"}
                                className="flex h-full w-full"
                                color={themeTatailwind.primary.color}
                                variant="caption"
                            >
                                <div className="flex w-full items-end">
                                    <PersonRoundedIcon
                                        sx={{ width: 21, height: 21 }}
                                        className="mr-2"
                                    />
                                    {author}
                                </div>
                                <div className="flex w-full items-end justify-end">
                                    <CalendarMonthRoundedIcon
                                        sx={{ width: 21, height: 21 }}
                                        className="mr-2"
                                    />
                                    {formatOnlyDate(published_at)}
                                </div>
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewCard;
