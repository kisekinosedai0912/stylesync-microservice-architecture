import { lazy } from "react";
import Layout from "./layout";

const Hero = lazy(() => import("./components/Hero"));

export function App() {
    return (
        <Layout>
            <Hero />
        </Layout>
    );
}

export default App;
