import RoutePage from "./routes/Routes";
import DarkMode from "./hooks/contex/DarkModeContex";

function App() {
  return (
    <DarkMode>
      <RoutePage />
    </DarkMode>
  );
}

export default App;
