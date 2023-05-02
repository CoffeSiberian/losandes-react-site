import { Typography } from "@mui/material";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import Divider from "@mui/material/Divider";

// icons
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";

const AttributesCard = () => {
    const { themeTatailwind } = useDarkMode();
    const Atributes = [
        {
            atribute: "Andes Community",
            description:
                "Una comunidad de camioneros virtuales apasionados que crea una experiencia realista y entretenida para sus miembros.",
            icon: <PeopleRoundedIcon fontSize="large" />,
        },
        {
            atribute: "Andes Staff & drivers",
            description:
                "Un equipo interno dedicado a brindar el mejor soporte y asistencia a los conductores para una experiencia gratificante en Los Andes.",
            icon: <AdminPanelSettingsRoundedIcon fontSize="large" />,
        },
        {
            atribute: "International convoys",
            description:
                "Emocionantes convoys internacionales que permiten unirse a la comunidad global de camioneros virtuales y demostrar habilidades en la carretera.",
            icon: <FlagRoundedIcon fontSize="large" />,
        },
        {
            atribute: "Competition & events",
            description:
                "Competencias y eventos que agregan emoción y diversión a la comunidad, promoviendo habilidades de conducción y alcanzando nuevas metas.",
            icon: <EmojiEventsRoundedIcon fontSize="large" />,
        },
        {
            atribute: "Partners program",
            description:
                "Programa de asociación estratégica y colaboración con otras empresas afines, ofreciendo beneficios mutuos y fortaleciendo la comunidad.",
            icon: <HandshakeRoundedIcon fontSize="large" />,
        },
    ];

    const AttributeCard = (id, atribute, description, icon) => {
        return (
            <div
                key={id}
                className={`flex flex-col ${themeTatailwind.secundary.main} max-w-lg rounded-lg border-2 border-transparent ${themeTatailwind.primary.border_color} shadow-2xl gap-3 m-4 p-4`}
            >
                <Typography
                    className="flex justify-center"
                    color={themeTatailwind.primary.color}
                >
                    {icon}
                </Typography>
                <Typography
                    className="flex justify-center"
                    color={themeTatailwind.primary.color}
                    variant="h6"
                >
                    {atribute}
                </Typography>
                <Divider />
                <div className="flex text-justify gap-3">
                    <Typography
                        color={themeTatailwind.primary.color}
                        variant="subtitle2"
                    >
                        {description}
                    </Typography>
                </div>
            </div>
        );
    };

    const renderAttributesP1 = () => {
        const divAtributes = Atributes.slice(0, 3);
        return (
            <div className="flex flex-col md:flex-row">
                {divAtributes.map((atribute, index) => {
                    return AttributeCard(
                        index,
                        atribute.atribute,
                        atribute.description,
                        atribute.icon
                    );
                })}
            </div>
        );
    };

    const renderAttributesP2 = () => {
        const divAtributes = Atributes.slice(3, 5);
        return (
            <div className="flex flex-col md:flex-row">
                {divAtributes.map((atribute, index) => {
                    return AttributeCard(
                        index,
                        atribute.atribute,
                        atribute.description,
                        atribute.icon
                    );
                })}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center">
            {renderAttributesP1()}
            {renderAttributesP2()}
        </div>
    );
};

export default AttributesCard;
