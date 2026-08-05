import { CopyrightIcon, ScissorsIcon } from "@phosphor-icons/react";

export default function Footer() {
    return (
        <footer className="w-full bg-[#9b8270] px-5 py-6 text-[#211a16] sm:px-8 sm:py-8 lg:px-16">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 border-y border-[#433b35]/55 py-5 sm:flex-row sm:items-center sm:justify-between">
                <a
                    className="inline-flex w-fit items-center gap-3 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#211a16]"
                    href="#hero"
                    aria-label="Dahling's Salon and Spa home"
                >
                    <span className="flex size-8 items-center justify-center rounded-full border border-[#433b35] text-[#2d2520]">
                        <ScissorsIcon
                            className="size-4"
                            weight="light"
                            aria-hidden="true"
                        />
                    </span>
                    <span className="font-serif text-xl italic leading-none tracking-[-0.035em]">
                        Dahling&apos;s
                        <span className="ml-2 font-sans text-[0.5rem] font-semibold not-italic uppercase tracking-[0.22em]">
                            salon & spa
                        </span>
                    </span>
                </a>

                <div className="flex flex-col items-start gap-4 text-xs font-semibold uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:gap-7">
                    <p className="inline-flex items-center gap-2">
                        <CopyrightIcon
                            className="size-4 shrink-0"
                            weight="regular"
                            aria-hidden="true"
                        />
                        All rights reserved 2026.
                    </p>
                    <a
                        className="transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#211a16]"
                        href="#hero"
                    >
                        Back to top ↑
                    </a>
                </div>
            </div>
        </footer>
    );
}
