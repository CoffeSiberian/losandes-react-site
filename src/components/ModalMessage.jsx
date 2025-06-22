import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import "../static/css/NewViewStyle.css";

const ModalMessage = ({ open, title, setError, msj }) => {
    return (
        <Dialog open={open} keepMounted aria-describedby="loading-info">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <div className="grid space-x-2 items-center">
                    <Typography
                        component="div"
                        className="break-words whitespace-pre-wrap"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                        >
                            {msj}
                        </ReactMarkdown>
                    </Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="success" onClick={() => setError(!open)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalMessage;
