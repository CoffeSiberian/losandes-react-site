import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "./pages/Home";
import Events from "./pages/Events";
import News from "./pages/News";
import Partners from "./pages/Partners";
import Staff from "./pages/Staff";
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Notfound from "./pages/Notfound";

const RoutePage = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <Home />
                        </>
                    }
                />
                <Route
                    path="/events"
                    element={
                        <>
                            <Header />
                            <Events />
                        </>
                    }
                />
                <Route
                    path="/news"
                    element={
                        <>
                            <Header />
                            <News />
                        </>
                    }
                />
                <Route
                    path="/partners"
                    element={
                        <>
                            <Header />
                            <Partners />
                        </>
                    }
                />
                <Route
                    path="/staff"
                    element={
                        <>
                            <Header />
                            <Staff />
                        </>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <>
                            <Header />
                            <Aboutus />
                        </>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <>
                            <Header />
                            <Contact />
                        </>
                    }
                />
                <Route
                    path="*"
                    element={
                        <>
                            <Header />
                            <Notfound />
                        </>
                    }
                />
            </Routes>
        </Router>
    );
};

export default RoutePage;
