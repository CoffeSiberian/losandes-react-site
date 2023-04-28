import slide1 from "../../static/img/slide_img/slide_1.jpeg";
import slide2 from "../../static/img/slide_img/slide_2.png";
import { useState } from "react";

const Home = () => {
    const [slide, setSlide] = useState(0);
    return (
        <div>
            <div className="flex relative max-h-64 h-auto max-w-full rounded-b-2xl justify-center border-b-4 border-b-amber-500 m-2 mb-24 md:mb-36">
                <img
                    className="object-cover object-center rounded-b-2xl w-full drop-shadow-2xl"
                    src={slide2}
                    alt="Slide"
                />
            </div>
        </div>
    );
};

export default Home;
