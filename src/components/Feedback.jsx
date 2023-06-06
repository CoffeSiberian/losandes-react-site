import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/news/33492"); // eslint-disable-next-line
    }, []);

    return <></>;
};

export default Feedback;
