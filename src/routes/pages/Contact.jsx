import { useState, useRef } from "react";
import { Typography } from "@mui/material";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";
import { REST_API_URL } from "../../helpers/configs";
import { TITLE } from "../../helpers/configs";
import Slider from "../../components/Slider";
import PartnersCard from "../../components/PartnersCard";
import deepClone from "../../helpers/deepClone";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SubmitButton from "../../components/SubmitButton";
import ReCaptchaCom from "../../components/ReCaptchaCom";

const Contact = () => {
    document.title = TITLE + " | Contacto";
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

    const ignoreError = ["discord"];

    const selectReason = [
        {
            value: "Reporte de conductor",
            label: "Reporte de usuario",
        },
        {
            value: "Contacto administrativo",
            label: "Contacto administrativo",
        },
        {
            value: "Sugerencia",
            label: "Sugerencia",
        },
        {
            value: "Opiniones",
            label: "Opiniones",
        },
        {
            value: "Contacto con el desarrollador",
            label: "Contacto con el desarrollador",
        },
        {
            value: "Otros",
            label: "Otros",
        },
    ];

    const recaptchaRef = useRef();

    const [data, setData] = useState({
        dataValues: baseData,
        dataError: baseError,
    });

    const handleChangeText = (event) => {
        const eId = event.target.attributes.id.value;
        const eValue = event.target.value;
        checkErrorAndChangeValues(eValue, eId);
    };

    const handleChangeSelect = (eValue, keyName) => {
        checkErrorAndChangeValues(eValue, keyName);
    };

    const resetAllData = () => {
        setData({
            dataValues: baseData,
            dataError: baseError,
        });
    };

    const ignoreListCheck = (keyName, dataValue) => {
        /* 
        If the value is in the ignore list, it returns false, 
        but if not, it will check if the data is empty or not.  
        */
        if (ignoreError.includes(keyName)) return false;
        return dataValue === "" ? true : false;
    };

    const checkErrorAndChangeValues = (dataValue, dataId) => {
        const cloneValues = deepClone(data.dataValues);
        const cloneError = deepClone(data.dataError);

        cloneValues[dataId] = dataValue;
        if (dataId === "email") {
            cloneError[dataId] = !checkValidEmail(dataValue);
        } else {
            cloneError[dataId] = ignoreListCheck(dataId, dataValue);
        }

        const newObject = {
            dataValues: cloneValues,
            dataError: cloneError,
        };
        setData(newObject);
    };

    const checkTextError = () => {
        /* return true if there is an error */
        const propsToCheck = Object.keys(data.dataError);
        const errors = propsToCheck.map((prop) => {
            return data.dataError[prop];
        });
        if (checkTextEmpty()) return true;
        return errors.includes(true);
    };

    const checkTextEmpty = () => {
        /* return true or false if there is an empty text */
        let errorCopy = deepClone(data.dataError);
        const propsToCheck = Object.keys(data.dataValues);
        const errors = propsToCheck.map((prop) => {
            if (ignoreError.includes(prop)) return false;

            if (data.dataValues[prop] === "") {
                errorCopy[prop] = true;
            }
            return data.dataValues[prop];
        });
        setData({ ...data, dataError: errorCopy });
        return errors.includes("");
    };

    const checkValidEmail = (email) => {
        const regex =
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        return regex.test(email);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full">
                <Slider />
            </div>
            <div
                className={`flex flex-col w-full max-w-6xl justify-items-center ${themeTatailwind.secundary.main} rounded-lg shadow-2x p-2 m-5`}
            >
                <Typography
                    className="flex justify-center pt-1"
                    color={themeTatailwind.primary.color}
                    variant="h4"
                >
                    <b>Contacto</b>
                </Typography>
                <div className="flex justify-center">
                    <Typography
                        component="div"
                        variant="caption"
                        className="max-w-xl text-justify p-3"
                        color={themeTatailwind.primary.color}
                    >
                        ¡Gracias por contactarnos! Completa el formulario y te
                        responderemos por correo electrónico lo antes posible.
                        Proporciona detalles para una mejor atención. Podría
                        haber demoras en la respuesta debido a la cantidad de
                        consultas, pero nos esforzaremos por ser rápidos.
                        ¡Esperamos resolver tus inquietudes y brindarte una
                        excelente experiencia!
                    </Typography>
                </div>
                <form className="flex flex-col gap-7 p-3 md:pl-14 md:pr-14">
                    <div className="flex flex-col md:flex-row justify-center gap-5">
                        <TextField
                            required
                            color="info"
                            inputProps={{ maxLength: 150 }}
                            error={data.dataError.name}
                            id="name"
                            label="Nombre"
                            variant="outlined"
                            value={data.dataValues.name}
                            onChange={handleChangeText}
                        />
                        <TextField
                            required
                            color="info"
                            inputProps={{ maxLength: 240 }}
                            error={data.dataError.email}
                            id="email"
                            label="Email"
                            variant="outlined"
                            value={data.dataValues.email}
                            onChange={handleChangeText}
                        />
                        <TextField
                            color="info"
                            inputProps={{ maxLength: 200 }}
                            error={data.dataError.discord}
                            id="discord"
                            label="Discord"
                            variant="outlined"
                            value={data.dataValues.discord}
                            onChange={handleChangeText}
                        />
                    </div>
                    <div className="flex justify-center gap-5">
                        <div className="w-full md:max-w-lg">
                            <TextField
                                sx={{ display: "flex", width: "100%" }}
                                required
                                color="info"
                                inputProps={{ maxLength: 200 }}
                                error={data.dataError.reason}
                                id="reason"
                                label="Razon"
                                select
                                variant="outlined"
                                value={data.dataValues.reason}
                                onChange={(e) =>
                                    handleChangeSelect(e.target.value, "reason")
                                }
                            >
                                {selectReason.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                    <div>
                        <TextField
                            required
                            color="info"
                            inputProps={{ maxLength: 3800 }}
                            error={data.dataError.message}
                            id="message"
                            label="Mensaje"
                            fullWidth
                            multiline
                            rows={5}
                            variant="outlined"
                            value={data.dataValues.message}
                            onChange={handleChangeText}
                        />
                    </div>

                    <div className="flex items-center gap-5 flex-col">
                        <ReCaptchaCom
                            handleChangeSelect={handleChangeSelect}
                            recaptchaRef={recaptchaRef}
                            error={data.dataError.captcha}
                        />
                        <SubmitButton
                            checkTextError={checkTextError}
                            data={data.dataValues}
                            recaptchaRef={recaptchaRef}
                            resetForm={resetAllData}
                            url={`${REST_API_URL}/postContact`}
                        />
                    </div>
                </form>
            </div>
            <div className="w-full">
                <PartnersCard />
            </div>
        </div>
    );
};

export default Contact;
