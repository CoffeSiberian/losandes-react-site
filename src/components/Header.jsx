import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/contex/DarkModeContex";
import { styled } from "@mui/material/styles";
import logo from "../static/img/logo.webp";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

// icons
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
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
//

import Switch from "@mui/material/Switch";
import MovileHeaderOptions from "./MovileHeaderOptions";

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
            url: "/news/31248",
        },
        {
            icon: HowToRegRoundedIcon,
            text: "Postularse",
            url: "/news/29574",
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
            url: "/news/29575",
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

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        "& .MuiSwitch-switchBase": {
            margin: 1,
            padding: 0,
            transform: "translateX(6px)",
            "&.Mui-checked": {
                color: "#fff",
                transform: "translateX(22px)",
                "& .MuiSwitch-thumb:before": {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        "#fff"
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
                },
            },
        },
        "& .MuiSwitch-thumb": {
            backgroundColor:
                theme.palette.mode === "dark" ? "#003892" : "#001e3c",
            width: 32,
            height: 32,
            "&:before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff"
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        "& .MuiSwitch-track": {
            opacity: 1,
            backgroundColor:
                theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            borderRadius: 20 / 2,
        },
    }));

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
                        <MaterialUISwitch
                            checked={darkMode}
                            onChange={(event) =>
                                setDarkMode(event.target.checked)
                            }
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Header;
