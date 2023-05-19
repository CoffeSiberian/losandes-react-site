import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_KEY } from "../helpers/configs";

const ReCapcha = ({ handleChangeSelect, recaptchaRef }) => {
    const onChange = (token) => {
        if (token !== null) {
            handleChangeSelect(token, "capcha");
        } else handleChangeSelect("", "capcha");
    };

    return (
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={CAPTCHA_KEY}
            onChange={onChange}
        />
    );
};

export default ReCapcha;
