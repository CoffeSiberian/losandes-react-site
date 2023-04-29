import { useDarkMode } from "../hooks/contex/DarkModeContex";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import Button from "@mui/material/Button";

const JoinCard = () => {
    const { themeTatailwind } = useDarkMode();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col md:flex-row">
            <div
                className={`flex flex-col ${themeTatailwind.secundary.main} rounded-lg border-2 border-transparent ${themeTatailwind.primary.border_color} shadow-2xl m-4 p-4`}
            >
                <div className="flex flex-col text-justify gap-5 pb-2">
                    <Typography
                        color={themeTatailwind.primary.color}
                        variant="h4"
                    >
                        <b>¡Bienvenidos a Los Andes VTC!</b>
                    </Typography>
                    <Typography
                        color={themeTatailwind.primary.color}
                        variant="subtitle1"
                    >
                        ¡Únete a Los Andes VTC y descubre la pasión por el
                        transporte en Euro Truck Simulator! Somos una comunidad
                        de conductores latinoamericanos comprometidos con la
                        excelencia. Participamos en convoys mundiales y
                        privados, construyendo una empresa reconocida por su
                        profesionalismo y carisma en el juego. ¡Embárcate en
                        emocionantes rutas y forma parte de nuestra historia en
                        Los Andes VTC!
                    </Typography>
                </div>
            </div>
            <div
                className={`flex flex-col ${themeTatailwind.secundary.main} rounded-lg border-2 border-transparent ${themeTatailwind.primary.border_color} shadow-2xl m-4 p-4`}
            >
                <div className="flex flex-col text-justify gap-5 pb-2">
                    <Typography
                        color={themeTatailwind.primary.color}
                        variant="subtitle1"
                    >
                        ¡Embárcate en emocionantes aventuras por las carreteras
                        virtuales junto a nosotros!
                    </Typography>
                    <Button
                        startIcon={<HowToRegRoundedIcon />}
                        variant="contained"
                        onClick={() => navigate("/apply")}
                    >
                        Postularse
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JoinCard;
