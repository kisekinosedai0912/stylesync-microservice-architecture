import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Loader from "./components/Loader";

// public/marketing pages
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Bookings = lazy(() => import("./components/Bookings"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// auth pages
const LoginPage = lazy(() =>
    import("@stylesync/auth-ui").then((module) => ({
        default: module.LoginPage,
    })),
);
const SignUpPage = lazy(() =>
    import("@stylesync/auth-ui").then((module) => ({
        default: module.SignUpPage,
    })),
);

// web/client pages
const Home = lazy(() => import("./pages/HomePage"));

export function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<PublicWebsite />} />
            </Routes>
        </Suspense>
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
