import { lazy } from "react";
import { LoginPage, SignUpPage } from "@stylesync/auth-ui";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout";

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Bookings = lazy(() => import("./components/Bookings"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

export function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="*" element={<PublicWebsite />} />
        </Routes>
    );
}

function PublicWebsite() {
    return (
        <Layout>
            <Hero />
            <About />
            <Services />
            <Bookings />
            <Contact />
            <Footer />
        </Layout>
    );
}

export default App;
