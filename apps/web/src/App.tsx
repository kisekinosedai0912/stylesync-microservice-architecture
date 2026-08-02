import { lazy } from "react";
import Layout from "./layout";

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Bookings = lazy(() => import("./components/Bookings"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

export function App() {
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
