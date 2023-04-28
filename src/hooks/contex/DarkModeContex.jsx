import { createContext, useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const DarkModeContex = createContext();

export const useDarkMode = () => {
    return useContext(DarkModeContex);
};

const DarkMode = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const darkMaterial = {
        palette: {
            mode: "dark",
            primary: {
                main: "#404040",
            },
            secundary: {
                main: "#606060",
            },
        },
    };

    const lightMaterial = {
        palette: {
            mode: "light",
            primary: {
                main: "#3ca9d0",
            },
            secundary: {
                main: "#ed9427",
            },
        },
    };

    const darkTailwind = {
        primary: {
            main: "bg-neutral-900",
            color: "white",
            border_color: "hover:border-cyan-600",
        },
        secundary: {
            main: "bg-stone-800",
            color: "white",
            border_color: "hover:border-cyan-600",
        },
    };

    const lightTailwind = {
        primary: {
            main: "bg-white",
            color: "black",
            border_color: "hover:border-cyan-600",
        },
        secundary: {
            main: "bg-gray-300",
            color: "black",
            border_color: "hover:border-cyan-600",
        },
    };

    const themeMaterial = createTheme(darkMode ? darkMaterial : lightMaterial);

    const themeTatailwind = darkMode ? darkTailwind : lightTailwind;

    return (
        <DarkModeContex.Provider
            value={{ darkMode, themeTatailwind, setDarkMode }}
        >
            <ThemeProvider theme={themeMaterial}>{children}</ThemeProvider>
        </DarkModeContex.Provider>
    );
};

export default DarkMode;
