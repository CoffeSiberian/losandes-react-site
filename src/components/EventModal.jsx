import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

const EventModal = ({ title, description, image, handleClose, open }) => {
    return (
        <div>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alertInfo"
                scroll={"paper"}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent className="flex flex-col gap-3">
                    <img
                        className="object-cover rounded-xl drop-shadow-lg"
                        src={image}
                        alt="rute"
                    />
                    <div className="flex justify-center">
                        <Button
                            variant="contained"
                            endIcon={<OpenInNewRoundedIcon />}
                            href={image}
                            target="_blank"
                        >
                            Expandir mapa
                        </Button>
                    </div>
                    <ReactMarkdown
                        className="viewNew"
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                    >
                        {description}
                    </ReactMarkdown>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EventModal;
