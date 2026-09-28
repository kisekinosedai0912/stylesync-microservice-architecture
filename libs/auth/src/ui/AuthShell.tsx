import type { ReactNode } from "react";

export interface AuthShellProps {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
}

export function AuthShell({
    eyebrow,
    title,
    description,
    children,
}: AuthShellProps) {
    return (
        <main className="ss-auth">
            <section className="ss-auth__story" aria-label="Dahling's Salon and Spa">
                <a
                    className="ss-auth__brand"
                    href="/"
                    aria-label="Dahling's Salon and Spa home"
                >
                    <span className="ss-auth__brand-mark" aria-hidden="true">
                        D
                    </span>
                    <span>
                        <span className="ss-auth__brand-name">Dahling&apos;s</span>
                        <span className="ss-auth__brand-caption">
                            salon &amp; spa
                        </span>
                    </span>
                </a>

                <div className="ss-auth__story-copy">
                    <p>Beauty, thoughtfully reserved</p>
                    <blockquote>
                        A refined space for every visit, every detail, and every
                        version of you.
                    </blockquote>
                </div>

                <p className="ss-auth__location">Sagay City · Philippines</p>
            </section>

            <section className="ss-auth__panel" aria-labelledby="auth-title">
                <div className="ss-auth__form-wrap">
                    <p className="ss-auth__eyebrow">{eyebrow}</p>
                    <h1 id="auth-title">{title}</h1>
                    <p className="ss-auth__description">{description}</p>
                    {children}
                </div>
            </section>
        </main>
    );
}
