import { Suspense, type ReactNode } from "react";
import Loader from "./components/Loader";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <main>
            <Suspense fallback={<Loader />}>{children}</Suspense>
        </main>
    );
}
