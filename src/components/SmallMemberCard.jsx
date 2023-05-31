import { Typography } from "@mui/material";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import Link from "@mui/material/Link";

const SmallMemberCard = ({ username, imgLink, id }) => {
    const { themeTatailwind, darkMode } = useDarkMode();
    return (
        <div
            className={`flex ${themeTatailwind.secundary.main} max-w-xs w-full rounded-lg justify-center items-center border-2 border-yellow-600 shadow-md p-5 gap-5`}
        >
            <img
                className="rounded-full w-12 h-12"
                src={imgLink}
                alt={username}
            />
            <Link
                color={darkMode ? "white" : "black"}
                href={`https://truckersmp.com/user/${id}`}
                target="_blank"
                underline="none"
            >
                <Typography
                    className="flex justify-center"
                    variant="h6"
                    component="div"
                    color={themeTatailwind.primary.color}
                >
                    <b>{username}</b>
                </Typography>
            </Link>
        </div>
    );
};

export default SmallMemberCard;
