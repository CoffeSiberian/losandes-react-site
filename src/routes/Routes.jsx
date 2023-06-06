import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollTop from "./ScrollTop";
import Header from "../components/Header";
import Home from "./pages/Home";
import Events from "./pages/Events";
import News from "./pages/News";
import NewView from "./pages/NewView";
import Staff from "./pages/Staff";
import Contact from "./pages/Contact";
import HallOfFame from "./pages/HallOfFame";
import Employees from "./pages/Employees";
import Notfound from "./pages/Notfound";
import Feedback from "../components/Feedback";

const RoutePage = () => {
    return (
        <Router>
            <ScrollTop />
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
                    path="/news/:newId"
                    element={
                        <>
                            <Header />
                            <NewView />
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
                    path="/contact"
                    element={
                        <>
                            <Header />
                            <Contact />
                        </>
                    }
                />
                <Route
                    path="/hall-of-fame"
                    element={
                        <>
                            <Header />
                            <HallOfFame />
                        </>
                    }
                />
                <Route
                    path="/employees"
                    element={
                        <>
                            <Header />
                            <Employees />
                        </>
                    }
                />
                <Route path="/feedback" element={<Feedback />} />
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
