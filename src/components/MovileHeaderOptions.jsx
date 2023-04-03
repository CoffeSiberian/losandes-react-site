import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";

const MovileHeaderOptions = ({ open, setOpen }) => {
    return (
        <Drawer open={open} onClose={() => setOpen(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <EventAvailableRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Eventos" />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <NewspaperRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Noticias" />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HandshakeRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Partners" />
                    </ListItemButton>
                </ListItem>
				<Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <BadgeRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Staff" />
                    </ListItemButton>
                </ListItem>
				<Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InfoRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sobre nosotros" />
                    </ListItemButton>
                </ListItem>
				<Divider />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AlternateEmailRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contacto" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default MovileHeaderOptions;
