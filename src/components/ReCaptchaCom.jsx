import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_KEY } from "../helpers/configs";

const ReCaptchaCom = ({ handleChangeSelect, recaptchaRef }) => {
    const onChange = (token) => {
        if (token !== null) {
            handleChangeSelect(token, "captcha");
        } else handleChangeSelect("", "captcha");
    };

    return (
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={CAPTCHA_KEY}
            onChange={onChange}
        />
    );
};

export default ReCaptchaCom;
