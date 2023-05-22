import { useState, useEffect, useRef } from "react";
import Slide from "@mui/material/Slide";
import slide1 from "../static/img/slide_img/1.jpg";
import slide2 from "../static/img/slide_img/2.jpg";
import slide3 from "../static/img/slide_img/3.jpg";
import slide4 from "../static/img/slide_img/4.jpg";
import slide5 from "../static/img/slide_img/5.jpg";

const Slider = () => {
    const [slide, setSlide] = useState(slide1);
    const [anim, setAnim] = useState(true);
    const currentSlide = useRef(1);

    const executeAnimation = async (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    useEffect(() => {
        const slides = [slide1, slide2, slide3, slide4, slide5];
        const changeSlide = async () => {
            setAnim(false);
            if (currentSlide.current === slides.length) {
                currentSlide.current = 0;
            }
            await executeAnimation(400);
            setSlide(slides[currentSlide.current++]);
            await executeAnimation(400);
            setAnim(true);
        };

        const interval = setInterval(() => {
            changeSlide();
        }, 4000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="flex relative max-h-96 h-auto max-w-full rounded-b-2xl justify-center border-b-4 overflow-hidden border-b-amber-500 m-2">
            <Slide direction="left" in={anim}>
                <img
                    className="object-cover object-center rounded-b-2xl w-full drop-shadow-2xl"
                    src={slide}
                    alt="Slide"
                />
            </Slide>
        </div>
    );
};

export default Slider;
