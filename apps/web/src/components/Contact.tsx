import {
    EnvelopeSimpleIcon,
    FacebookLogoIcon,
    InstagramLogoIcon,
    XLogoIcon,
} from "@phosphor-icons/react";

const contactChannels = [
    {
        name: "Email / Gmail",
        description: "For treatment questions and general salon inquiries.",
        href: "",
        icon: EnvelopeSimpleIcon,
    },
    {
        name: "Facebook",
        description: "Follow salon updates and send us a direct message.",
        href: "https://www.facebook.com/dahlingsescapesalonandspa",
        icon: FacebookLogoIcon,
    },
    {
        name: "Instagram",
        description: "Discover recent looks, treatments, and inspiration.",
        href: "",
        icon: InstagramLogoIcon,
    },
    {
        name: "X / Twitter",
        description: "Keep up with brief news and salon announcements.",
        href: "",
        icon: XLogoIcon,
    },
];

export default function Contact() {
    return (
        <section
            id="contact"
            className="hero w-full px-5 py-20 text-[#fffaf3] sm:px-8 sm:py-24 lg:px-16 lg:py-28"
            aria-labelledby="contact-title"
        >
            <div className="mx-auto grid w-full max-w-5xl gap-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(22rem,1.22fr)] lg:gap-20">
                <SideNote />

                <div className="bg-[#fffaf3] p-6 text-[#433b35] shadow-[0_24px_65px_rgba(0,0,0,0.18)] sm:p-9 lg:p-11">
                    <p className="font-serif text-2xl tracking-[-0.025em] text-[#544940] sm:text-3xl">
                        Find us online
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-6 text-[#79695e]">
                        Choose the channel that suits you best. These are our
                        active platforms, feel free to send us a direct message
                        anytime.
                    </p>

                    <ContactCards />
                </div>
            </div>
        </section>
    );
}

function SideNote() {
    return (
        <div className="flex flex-col">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#c7ad99]">
                We would love to hear from you
            </p>
            <h2
                id="contact-title"
                className="max-w-lg font-serif text-[clamp(2.5rem,5vw,4.75rem)] font-normal leading-[0.95] tracking-[-0.045em]"
            >
                Let&apos;s make your
                <span className="block italic text-[#c7ad99]">
                    next visit special.
                </span>
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-[#e0d7d0]">
                Have a question about a treatment or want help choosing the
                right service? Contact us through our social media accounts, we
                would love to hear from you.
            </p>

            <div className="mt-10 grid gap-7 border-t border-white/20 pt-8 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c7ad99]">
                        Visit
                    </p>
                    <p className="mt-2 font-serif text-xl">Sagay City</p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c7ad99]">
                        Ready to reserve?
                    </p>
                    <a
                        className="mt-2 inline-flex items-center gap-4 border-b border-white/50 pb-1 text-sm transition-colors hover:border-white"
                        href="#booking"
                    >
                        Book an appointment
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>

            <p className="mt-auto hidden pt-16 font-serif text-2xl italic text-[#c7ad99] lg:block">
                Dahling&apos;s
                <span className="ml-3 font-sans text-[0.55rem] font-semibold not-italic uppercase tracking-[0.25em] text-[#e0d7d0]">
                    salon & spa
                </span>
            </p>
        </div>
    );
}

function ContactCards() {
    return (
        <div className="mt-8 grid gap-px bg-[#d8cec6] sm:grid-cols-2">
            {contactChannels.map((channel) => {
                const Icon = channel.icon;

                return (
                    <a
                        key={channel.name}
                        className="group flex min-h-44 flex-col bg-[#fffaf3] p-5 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#433b35] sm:p-6"
                        href={channel.href || undefined}
                        aria-disabled={!channel.href}
                    >
                        <span className="flex items-start justify-between">
                            <Icon
                                className="size-7 text-[#967d69]"
                                weight="light"
                                aria-hidden="true"
                            />
                            <span
                                className="text-base text-[#967d69] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </span>
                        <span className="mt-7 font-serif text-xl text-[#544940]">
                            {channel.name}
                        </span>
                        <span className="mt-2 text-xs leading-5 text-[#79695e]">
                            {channel.description}
                        </span>
                        <span className="mt-auto pt-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#967d69]">
                            Details coming soon
                        </span>
                    </a>
                );
            })}
        </div>
    );
}
