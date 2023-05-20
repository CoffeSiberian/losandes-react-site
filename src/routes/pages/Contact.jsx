import { useState, useRef } from "react";
import { Typography } from "@mui/material";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import { PROXY_CORS_REST_API_URL } from "../../helpers/configs";
import TextField from "@mui/material/TextField";
//import MenuItem from "@mui/material/MenuItem";
import SubmitButton from "../../components/SubmitButton";
import ReCaptchaCom from "../../components/ReCaptchaCom";

const Contact = () => {
    const { themeTatailwind } = useDarkMode();
    const baseData = {
        name: "",
        email: "",
        reason: "",
        discord: "",
        message: "",
        captcha: "",
    };

    const baseError = {
        name: false,
        email: false,
        reason: false,
        discord: false,
        message: false,
        captcha: false,
    };

    const recaptchaRef = useRef();
    const [inputError, setInputError] = useState(baseError);

    const [data, setData] = useState(baseData);

    const handleChangeText = (event) => {
        const eId = event.target.attributes.id.value;
        const eValue = event.target.value;
        setData({ ...data, [eId]: eValue });
    };

    const handleChangeSelect = (eValue, keyName) => {
        setData({ ...data, [keyName]: eValue });
    };

    const resetAllData = () => {
        setData(baseData);
        setInputError(baseError);
    };

    const checkTextError = () => {
        let objToChange = {};
        for (let r in data) {
            if (typeof data[r] === "string") {
                if (data[r] === "") {
                    objToChange[r] = true;
                } else objToChange[r] = false;
            }
        }
        setInputError(objToChange);
        for (let r in objToChange) if (objToChange[r]) return true;
        return false;
    };

    return (
        <div className="flex flex-col justify-center">
            <Typography
                className="flex text-center md:justify-center"
                variant="h3"
                color={themeTatailwind.primary.color}
            >
                Formulario de contacto
            </Typography>
            <form className="flex flex-col">
                <div>
                    <TextField
                        error={inputError.name}
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        value={data.name}
                        onChange={handleChangeText}
                    />
                    <TextField
                        error={inputError.email}
                        id="email"
                        label="Email"
                        variant="outlined"
                        value={data.email}
                        onChange={handleChangeText}
                    />
                    <TextField
                        error={inputError.reason}
                        id="reason"
                        label="Razon"
                        variant="outlined"
                        value={data.reason}
                        onChange={handleChangeText}
                    />
                    <TextField
                        error={inputError.discord}
                        id="discord"
                        label="Discord"
                        variant="outlined"
                        value={data.discord}
                        onChange={handleChangeText}
                    />
                    <TextField
                        error={inputError.message}
                        id="message"
                        label="Mensaje"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={data.message}
                        onChange={handleChangeText}
                    />
                </div>
                <div className="flex items-center m-3 flex-col">
                    <ReCaptchaCom
                        handleChangeSelect={handleChangeSelect}
                        recaptchaRef={recaptchaRef}
                    />
                    <SubmitButton
                        checkTextError={checkTextError}
                        data={data}
                        recaptchaRef={recaptchaRef}
                        resetForm={resetAllData}
                        url={`${PROXY_CORS_REST_API_URL}/postContact`}
                    />
                </div>
            </form>
        </div>
    );
};

export default Contact;
