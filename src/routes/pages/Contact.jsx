import { useState, useRef } from "react";
import { Typography } from "@mui/material";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SubmitButton from "../../components/SubmitButton";
import ReCapcha from "../../components/ReCapcha";

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
        <div className="flex justify-center">
            <form className="flex flex-col">
                <Typography
                    className="flex text-center md:justify-center"
                    variant="h3"
                    color={themeTatailwind.primary.color}
                >
                    Formulario de contacto
                </Typography>

                <div className="flex items-center m-3 flex-col">
                    <ReCapcha
                        handleChangeSelect={handleChangeSelect}
                        recaptchaRef={recaptchaRef}
                    />
                    <SubmitButton
                        checkTextError={checkTextError}
                        data={data}
                        recaptchaRef={recaptchaRef}
                        resetForm={resetAllData}
                    />
                </div>
            </form>
        </div>
    );
};

export default Contact;
