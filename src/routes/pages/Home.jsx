import { TITLE } from "../../helpers/configs";
import Slider from "../../components/Slider";
import JoinCard from "../../components/JoinCard";
import PartnersCard from "../../components/PartnersCard";
import Statistics from "../../components/Statistics";
import AttributesCard from "../../components/AttributesCard";

const Home = () => {
    document.title = TITLE + " | Inicio";
    return (
        <div>
            <Slider />
            <JoinCard />
            <AttributesCard />
            <Statistics />
            <PartnersCard />
        </div>
    );
};

export default Home;
