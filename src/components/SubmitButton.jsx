import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

import useFetch from "../hooks/useFetch";
import AlertModal from "./AlertModal";
import SnakeBarInfo from "./SnakeBarInfo";

const SubmitButton = ({
    checkTextError,
    data,
    recaptchaRef,
    resetForm,
    url,
}) => {
    const [openEmpyData, setOpenEmpyData] = useState(false);
    const [loading, error, succes, bodyResponse, setError, setSucces] =
        useFetch(url, "POST", {
            "Content-Type": "application/json",
        });

    const dataEmpyToSend = async () => {
        if (checkTextError()) {
            return setOpenEmpyData(true);
        }
        const fetchResponse = await bodyResponse(data);
        if (fetchResponse.ok) {
            recaptchaRef.current.reset();
            resetForm();
        }
    };

    return (
        <div className="mt-3">
            <AlertModal
                title="Completa toda la informacion"
                description="Falta informacion que completes en el formulario"
                handleClose={() => setOpenEmpyData(false)}
                open={openEmpyData}
            />
            <AlertModal
                title="No pudimos enviar el formulario"
                description="Verifica tu conexion a internet o intenta mas tarde"
                handleClose={() => setError(false)}
                open={error}
            />
            <SnakeBarInfo
                msj="Enviado con exito"
                severity="success"
                open={succes}
                setOpen={setSucces}
            />
            <LoadingButton
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                size="large"
                onClick={dataEmpyToSend}
            >
                Enviar
            </LoadingButton>
        </div>
    );
};

export default SubmitButton;
