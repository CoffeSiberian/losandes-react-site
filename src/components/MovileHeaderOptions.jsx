import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MovileHeaderOptions = ({
    options,
    drawerOptions,
    openDrawer,
    setOpenDrawer,
}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Drawer
            className="flex md:hidden"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
        >
            <List>
                {options.map((option, index) => (
                    <div key={index}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate(option.url);
                                    setOpenDrawer(false);
                                }}
                            >
                                <ListItemIcon>{<option.icon />}</ListItemIcon>
                                <ListItemText primary={option.text} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </div>
                ))}
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <BusinessRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Empresa" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {drawerOptions.map((option, index) => (
                    <ListItem key={index} disablePadding>
                        <Collapse
                            className="flex justify-center w-full"
                            in={open}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List>
                                <ListItemButton
                                    onClick={() => {
                                        navigate(option.url);
                                        handleClick();
                                        setOpenDrawer(false);
                                    }}
                                >
                                    <ListItemIcon>
                                        {<option.icon />}
                                    </ListItemIcon>
                                    <ListItemText primary={option.text} />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default MovileHeaderOptions;
