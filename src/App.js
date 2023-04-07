import RoutePage from "./routes/Routes";
import DarkMode from "./hooks/contex/DarkModeContex";
import Footer from "./components/Footer";

function App() {
  return (
    <DarkMode>
      <div className="flex flex-col min-h-screen">
        <RoutePage />
        <Footer />
      </div>
    </DarkMode>
  );
}

export default App;
