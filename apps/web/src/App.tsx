import { lazy } from "react";
import Layout from "./layout";

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));

export function App() {
    return (
        <Layout>
            <Hero />
            <About />
        </Layout>
    );
}

export default App;
