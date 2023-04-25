import { Typography } from "@mui/material";
import { formatOnlyDate } from "../helpers/formatdate";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import Button from "@mui/material/Button";

// icons
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

const StaffCard = ({ id, username, img, roleName, dateJoin }) => {
    const { themeTatailwind } = useDarkMode();
    return (
        <div
            className={`flex flex-col ${themeTatailwind.secundary.main} rounded-lg border-2 border-transparent hover:border-[${themeTatailwind.primary.border_color}] w-96 shadow-2xl m-4 mb-12 p-4 gap-3`}
        >
            <div>
                <Typography
                    className="flex justify-center"
                    variant="h5"
                    component="div"
                    color={themeTatailwind.primary.color}
                >
                    <b>{username}</b>
                </Typography>
                <Typography
                    className="flex justify-center pt-1"
                    variant="body1"
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
