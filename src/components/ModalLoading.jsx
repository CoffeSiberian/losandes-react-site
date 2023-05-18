import { useDarkMode } from "../hooks/contex/DarkModeContex";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

const ModalLoading = ({ open }) => {
    const { darkMode } = useDarkMode();

    return (
        <Dialog open={open} keepMounted aria-describedby="loading-info">
            <DialogTitle>Cargando...</DialogTitle>
            <DialogContent>
                <div className="flex space-x-2 items-center">
                    <CircularProgress
                        color={darkMode ? "inherit" : "primary"}
                    />
                    <DialogContentText id="loading-info-text">
                        Esto puede tomar unos segundos
                    </DialogContentText>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ModalLoading;
