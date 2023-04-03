import RoutePage from "./routes/Routes";
import Header from "./components/Header";
import DarkMode from "./hooks/contex/DarkModeContex";

function App() {
  return (
    <DarkMode>
      <Header />
      <RoutePage />
    </DarkMode>
  );
}

export default App;
