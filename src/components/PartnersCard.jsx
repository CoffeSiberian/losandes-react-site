import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import { Typography } from "@mui/material";
import { PARTNERS, PROXY_CORS_REST_API_URL } from "../helpers/configs";
import Button from "@mui/material/Button";

// icons
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";

const PartnersCard = () => {
    const { themeTatailwind } = useDarkMode();
    const navigate = useNavigate();
    const urlImage = `${PROXY_CORS_REST_API_URL}/getPartnerLogo/`;

    const renderPartners = () => {
        return PARTNERS.map((partner, index) => {
            return (
                <div
                    key={index}
                    className={`flex relative ${themeTatailwind.secundary.main_contrast} items-center border-2 border-yellow-600 rounded-xl p-4`}
                >
                    <a href={partner.link} target="_blank" rel="noreferrer">
                        <img
                            className="object-cover rounded-full drop-shadow-lg w-24 h-24"
                            src={`${urlImage}${partner.logo}`}
                            alt={partner.name}
                        />
                    </a>
                </div>
            );
        });
    };
    return (
        <div
            className={`${themeTatailwind.secundary.main} rounded-lg shadow-2xl m-4 p-4`}
        >
            <div className="flex flex-col items-center text-justify w-full gap-5 pb-2">
                <Typography color={themeTatailwind.primary.color} variant="h4">
                    <b>Partners oficiales</b>
                </Typography>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 2xl:grid-cols-10 justify-items-center gap-4">
                    {renderPartners()}
                </div>
                <Button
                    endIcon={<HandshakeRoundedIcon />}
                    variant="contained"
                    onClick={() => navigate("/news/31248")}
                >
                    ¡Hazte Partner!
                </Button>
            </div>
        </div>
    );
};

export default PartnersCard;
