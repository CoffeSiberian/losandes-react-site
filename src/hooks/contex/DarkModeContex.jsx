import { createContext, useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const DarkModeContex = createContext();

export const useDarkMode = () => {
    return useContext(DarkModeContex);
};

const DarkMode = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const dark = {
        palette: {
            mode: "dark",
            primary: {
                main: "#7D7D7D",
            },
        },
    };

    const light = {
        palette: {
            mode: "light",
            primary: {
                main: "#3ca9d0",
            },
        },
    };

    const darkTheme = createTheme(darkMode ? dark : light);

    return (
        <DarkModeContex.Provider value={{ darkMode, setDarkMode }}>
            <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
        </DarkModeContex.Provider>
    );
};

export default DarkMode;
