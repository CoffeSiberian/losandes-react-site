import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
// import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// icons
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
//

const NewCard = ({
    img,
    title,
    content_summary,
    author,
    published_at,
    pinned,
    url,
}) => {
    const { darkMode, themeTatailwind } = useDarkMode();
    const color = darkMode ? "white" : "black";

    const formatDate = (date) => {
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return dayjs
            .tz(date, "UTC")
            .tz(dayjs.tz.guess())
            .format("DD/MMMM/YYYY");
    };

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
                className={`flex flex-col ${themeTatailwind.secundary.main} rounded-lg border-2 border-transparent hover:border-[#3ca9d0] shadow-2xl m-4 mb-12 p-4`}
            >
                <img
                    className="object-cover rounded-lg drop-shadow-lg"
                    src="https://static.truckersmp.com/images/event/cover/14653.1678403142.jpeg"
                    alt="Los Andes VTC logo"
                />
                <div className="flex flex-col h-full pb-2">
                    <div>
                        <Link
                            className="flex justify-center p-2"
                            href={url}
                            color={color}
                            target="_blank"
                            underline="none"
                        >
                            <Typography variant="h6">{title}</Typography>
                        </Link>
                        <Divider />
                    </div>
                    <div className="flex pt-2">
                        <Typography
                            component={"div"}
                            color={color}
                            variant="subtitle2"
                        >
                            <div>{content_summary}</div>
                        </Typography>
                    </div>
                    <div className="flex h-full w-full pt-3">
                        <Typography
                            component={"div"}
                            className="flex h-full w-full"
                            color={color}
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
                                {formatDate(published_at)}
                            </div>
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewCard;
