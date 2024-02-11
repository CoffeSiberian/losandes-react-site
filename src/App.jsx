import RoutePage from "./routes/Routes";
import { useDarkMode } from "./hooks/contex/DarkModeContex";
import Footer from "./components/Footer";

function App() {
    const { themeTatailwind } = useDarkMode();
    return (
        <div
            className={`flex flex-col min-h-screen ${themeTatailwind.primary.main}`}
        >
            <RoutePage />
            <Footer />
        </div>
    );
}

export default App;
