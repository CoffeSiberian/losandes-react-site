import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";

const MovileHeaderOptions = ({ options, open, setOpen }) => {
    const navigate = useNavigate();
    return (
        <Drawer
            className="flex md:hidden"
            open={open}
            onClose={() => setOpen(false)}
        >
            <List>
                {options.map((option, index) => (
                    <div key={index}>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate(option.url);
                                    setOpen(false);
                                }}
                            >
                                <ListItemIcon>{<option.icon />}</ListItemIcon>
                                <ListItemText primary={option.text} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </Drawer>
    );
};

export default MovileHeaderOptions;
