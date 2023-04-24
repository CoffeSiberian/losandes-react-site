import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../static/img/logo.png";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
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
            icon: HowToRegRoundedIcon,
            text: "Postularse",
            url: "/apply",
        },
        {
            icon: AlternateEmailRoundedIcon,
            text: "Contacto",
            url: "/contact",
        },
    ];

    const BusineOptions = [
        {
            icon: InfoRoundedIcon,
            text: "Sobre nosotros",
            url: "/about",
        },
        {
            icon: AssignmentIndRoundedIcon,
            text: "Empleados",
            url: "/employees",
        },
        {
            icon: FavoriteRoundedIcon,
            text: "Salon de la fama",
            url: "/hall-of-fame",
        },
        {
            icon: BadgeRoundedIcon,
            text: "Staff",
            url: "/staff",
        },
    ];

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav
            className={`pb-40 sm:pb-48 md:pb-36 ${
                darkMode ? "bg-neutral-900" : "bg-white"
            }`}
        >
            <AppBar position="fixed">
                <div className="flex absolute justify-center top-3 w-full">
                    <img
                        className="drop-shadow-2xl w-32"
                        src={logo}
                        alt="Los Andes VTC logo"
                    />
                </div>
                <MovileHeaderOptions
                    options={HeaderOptions}
                    openDrawer={menuOpen}
                    setOpenDrawer={setMenuOpen}
                    drawerOptions={BusineOptions}
                />
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
                        {HeaderOptions.slice(0, 3).map((option, index) => (
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
                        <Button
                            color="inherit"
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                            onMouseEnter={(event) => handleClick(event)}
                            startIcon={<BusinessRoundedIcon />}
                            endIcon={<KeyboardArrowDownRoundedIcon />}
                        >
                            Empresa
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <div onMouseLeave={() => handleClose()}>
                                {BusineOptions.map((option, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => {
                                            navigate(option.url);
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            {<option.icon />}
                                        </ListItemIcon>
                                        <ListItemText primary={option.text} />
                                    </MenuItem>
                                ))}
                            </div>
                        </Menu>
                        <Divider
                            sx={{ mr: 1 }}
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        />
                    </div>

                    <div className="md:flex hidden justify-end w-full">
                        <Divider
                            sx={{ mr: 1 }}
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        />
                        {HeaderOptions.slice(3).map((option, index) => (
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
