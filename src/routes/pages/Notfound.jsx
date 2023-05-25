import { TITLE } from "../../helpers/configs";
import EmptyData from "../../components/EmptyData";

const Notfound = () => {
    document.title = TITLE + " | 404";
    return <EmptyData msj={"No se encontró la página que buscas"} />;
};

export default Notfound;
