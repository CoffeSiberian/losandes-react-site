import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_KEY } from "../helpers/configs";
import { useDarkMode } from "../hooks/contex/DarkModeContex";

const ReCaptchaCom = ({ handleChangeSelect, recaptchaRef, error }) => {
    const { darkMode } = useDarkMode();
    const onChange = (token) => {
        if (token !== null) {
            handleChangeSelect(token, "captcha");
        } else handleChangeSelect("", "captcha");
    };

    return (
        <div
            className={`p-4 rounded-lg border-2 ${
                !error ? "border-green-600" : "border-red-600"
            }`}
        >
            <div>
                <ReCAPTCHA
                    theme={darkMode ? "dark" : "light"}
                    ref={recaptchaRef}
                    sitekey={CAPTCHA_KEY}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default ReCaptchaCom;
