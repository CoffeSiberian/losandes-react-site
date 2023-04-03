import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../static/img/logo.png";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";

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

    return (
        <nav>
            <AppBar position="static">
                <MovileHeaderOptions open={menuOpen} setOpen={setMenuOpen} />
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
                            <Button
                                startIcon={<HomeRoundedIcon />}
                                color="inherit"
                            >
                                Inicio
                            </Button>
                            <Divider
                                sx={{ mr: 1 }}
                                orientation="vertical"
                                variant="middle"
                                flexItem
                            />
                            <Button
                                startIcon={<EventAvailableRoundedIcon />}
                                color="inherit"
                            >
                                Eventos
                            </Button>
                            <Divider
                                sx={{ mr: 1 }}
                                orientation="vertical"
                                variant="middle"
                                flexItem
                            />
                            <Button
                                startIcon={<NewspaperRoundedIcon />}
                                color="inherit"
                            >
                                Noticias
                            </Button>
                            <Divider
                                sx={{ mr: 1 }}
                                orientation="vertical"
                                variant="middle"
                                flexItem
                            />
                            <Button
                                startIcon={<HandshakeRoundedIcon />}
                                color="inherit"
                            >
                                Partners
                            </Button>
                        </div>
                        <div className="flex absolute justify-center top-0 w-full">
                            <img
                                className="w-3/12 md:w-1/12"
                                src={logo}
                                alt="Los Andes VTC logo"
                            />
                        </div>
                        <div className="md:flex hidden justify-end w-full">
                            <Button
                                startIcon={<BadgeRoundedIcon />}
                                color="inherit"
                            >
                                Staff
                            </Button>
                            <Divider
                                sx={{ mr: 1 }}
                                orientation="vertical"
                                variant="middle"
                                flexItem
                            />
                            <Button
                                startIcon={<InfoRoundedIcon />}
                                color="inherit"
                            >
                                Sobre nosotros
                            </Button>
                            <Divider
                                sx={{ mr: 1 }}
                                orientation="vertical"
                                variant="middle"
                                flexItem
                            />
                            <Button
                                startIcon={<AlternateEmailRoundedIcon />}
                                color="inherit"
                            >
                                Contacto
                            </Button>
                            <Divider
                                sx={{ mr: 1 }}
                                orientation="vertical"
                                variant="middle"
                                flexItem
                            />
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
