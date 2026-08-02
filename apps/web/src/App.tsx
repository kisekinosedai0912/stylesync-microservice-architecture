import { lazy } from "react";
import Layout from "./layout";

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));

export function App() {
    return (
        <Layout>
            <Hero />
            <About />
            <Services />
        </Layout>
    );
}

export default App;
