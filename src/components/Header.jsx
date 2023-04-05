import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../static/img/logo.png";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";

import MovileHeaderOptions from "./MovileHeaderOptions";

import { useState } from "react";
import { useDarkMode } from "../hooks/contex/DarkModeContex";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { darkMode, setDarkMode } = useDarkMode();
    const navigate = useNavigate();

    const HeaderOptions = [
        {
            icon: HomeRoundedIcon,
            text: "Inicio",
            url: "/",
        },
        {
            icon: EventAvailableRoundedIcon,
            text: "Eventos",
            url: "/events",
        },
        {
            icon: NewspaperRoundedIcon,
            text: "Noticias",
            url: "/news",
        },
        {
            icon: HandshakeRoundedIcon,
            text: "Partners",
            url: "/partners",
        },
        {
            icon: BadgeRoundedIcon,
            text: "Staff",
            url: "/staff",
        },
        {
            icon: InfoRoundedIcon,
            text: "Sobre Nosotros",
            url: "/about",
        },
        {
            icon: AlternateEmailRoundedIcon,
            text: "Contacto",
            url: "/contact",
        },
    ];

    return (
        <nav>
            <AppBar position="static">
                <div className="flex absolute justify-center top-3 w-full">
                    <img
                        className="drop-shadow-2xl w-3/12 md:w-1/12"
                        src={logo}
                        alt="Los Andes VTC logo"
                    />
                </div>
                <MovileHeaderOptions options={HeaderOptions} open={menuOpen} setOpen={setMenuOpen} />
                <Toolbar disableGutters>
                    <div className="flex md:hidden">
                        <IconButton
                            aria-label="Menu"
                            color="inherit"
                            size="large"
                            onClick={() => setMenuOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Divider
                            sx={{ mr: 1 }}
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        />
                    </div>
                    <div className="md:flex ml-5 hidden justify-start w-full">
                        {HeaderOptions.slice(0, 4).map((option, index) => (
                            <div className="flex" key={index}>
                                <Button
                                    startIcon={<option.icon />}
                                    color="inherit"
                                    onClick={() => navigate(option.url)}
                                    >
                                    {option.text}
                                </Button>
                                <Divider
                                    sx={{ mr: 1 }}
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                />
                            </div>
                        ))}
                    </div>

                    <div className="md:flex hidden justify-end w-full">
                        <Divider
                            sx={{ mr: 1 }}
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        />
                        {HeaderOptions.slice(4).map((option, index) => (
                            <div className="flex" key={index}>
                                <Button
                                    startIcon={<option.icon />}
                                    color="inherit"
                                    onClick={() => navigate(option.url)}
                                    >
                                    {option.text}
                                </Button>
                                <Divider
                                    sx={{ mr: 1 }}
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full mr-5 justify-end md:w-auto">
                        <IconButton onClick={() => setDarkMode(!darkMode)}>
                            <Brightness4RoundedIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Header;
