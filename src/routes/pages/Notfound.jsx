import { TITLE } from "../../helpers/configs";
const Notfound = () => {
    document.title = TITLE + " | Not Found";
    return <div>Notfound</div>;
};

export default Notfound;
