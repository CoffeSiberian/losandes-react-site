import { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AlertModal = ({ title, description, handleClose, open }) => {
    if (open === undefined) open = false;
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-describedby="alertInfo"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alertInfo">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleClose}>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertModal;
