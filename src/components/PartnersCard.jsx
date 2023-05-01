import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

// icons
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";

// parners logos
import logo1 from "../static/img/partners/castores_trucking.jpg";
import logo2 from "../static/img/partners/federal_vtc.png";
import logo3 from "../static/img/partners/logistica_cordillera.jpg";
import logo4 from "../static/img/partners/logistica_sudamericana.png";
import logo5 from "../static/img/partners/nova_era_transportes.png";
import logo6 from "../static/img/partners/traileros_del_mundo.png";
import logo7 from "../static/img/partners/transportes_bahia.png";
import logo8 from "../static/img/partners/transportes_cam_cr.png";
//

const PartnersCard = () => {
    const { themeTatailwind } = useDarkMode();
    const navigate = useNavigate();
    const logos = useRef([
        {
            name: "Castores Trucking",
            logo: logo1,
            link: "https://truckersmp.com/vtc/29591",
        },
        {
            name: "Federal VTC",
            logo: logo2,
            link: "https://truckersmp.com/vtc/28490",
        },
        {
            name: "Logística Cordillera",
            logo: logo3,
            link: "https://truckersmp.com/vtc/53937",
        },
        {
            name: "Logística Sudamericana",
            logo: logo4,
            link: "https://truckersmp.com/vtc/56572",
        },
        {
            name: "Nova Era Transportes",
            logo: logo5,
            link: "https://truckersmp.com/vtc/34966",
        },
        {
            name: "Traileros del Mundo",
            logo: logo6,
            link: "https://truckersmp.com/vtc/53105",
        },
        {
            name: "Transportes Bahía",
            logo: logo7,
            link: "https://truckersmp.com/vtc/35377-transportes-bahia",
        },
        {
            name: "Transportes CAM CR",
            logo: logo8,
            link: "https://truckersmp.com/vtc/50578",
        },
    ]);

    const renderPartners = () => {
        return logos.current.map((partner, index) => {
            return (
                <div
                    key={index}
                    className={`flex flex-col ${themeTatailwind.secundary.main_contrast} items-center border-2 border-yellow-600 rounded-xl p-4`}
                >
                    <a href={partner.link} target="_blank" rel="noreferrer">
                        <img
                            className="object-cover rounded-full drop-shadow-lg w-24 h-24"
                            src={partner.logo}
                            alt={partner.name}
                        />
                    </a>
                </div>
            );
        });
    };

    return (
        <div className="flex flex-col">
            <div
                className={`flex ${themeTatailwind.secundary.main} rounded-lg shadow-2xl m-4 p-4`}
            >
                <div className="flex flex-col items-center text-justify w-full gap-5 pb-2">
                    <Typography
                        color={themeTatailwind.primary.color}
                        variant="h4"
                    >
                        <b>Partners oficiales</b>
                    </Typography>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 justify-items-center gap-4">
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
        </div>
    );
};

export default PartnersCard;
