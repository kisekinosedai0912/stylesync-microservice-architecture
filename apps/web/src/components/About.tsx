import { memo } from "react";

export default function About() {
    return (
        <section
            id="about"
            className="flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-[#f7f4ee] px-5 pb-20 text-[#433b35] sm:px-8 sm:pb-24 lg:px-16 lg:pb-28"
        >
            <TopSection />
            <BottomSection />
        </section>
    );
}

function TopSection() {
    return (
        <div className="flex w-full items-center justify-center py-16 text-center sm:py-20 lg:py-24">
            <p className="max-w-2xl font-serif text-[clamp(1.45rem,2.3vw,2.45rem)] font-normal leading-[1.18] tracking-[-0.025em] text-[#544940]">
                Our <span className="italic text-[#967d69]">goal</span> is to{" "}
                <span className="font-semibold">provide</span> a holistic
                experience, that{" "}
                <span className="italic text-[#967d69]">leaves you</span>{" "}
                looking and feeling your{" "}
                <span className="font-semibold">best</span>
            </p>
        </div>
    );
}

const BottomSection = memo(function BottomSection() {
    return (
        <div className="grid w-full max-w-5xl items-stretch gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:gap-14 xl:gap-20">
            <img
                src=""
                alt=""
                className="min-h-[24rem] w-full bg-[url('/about.jpg')] bg-cover bg-center shadow-[0_20px_55px_rgba(79,60,47,0.12)] sm:min-h-[30rem] lg:min-h-[36rem]"
            />
            <div className="flex flex-col items-start justify-center px-2 py-3 sm:px-6 lg:px-0 lg:py-8">
                <h3 className="mb-6 font-serif text-[clamp(1.9rem,2.7vw,2.85rem)] font-normal leading-none tracking-[-0.035em] text-[#544940]">
                    About us
                </h3>
                <p className="max-w-md text-sm font-medium uppercase leading-7 tracking-[0.18em] text-[#8b7565]">
                    Hi! I'm Laura, founder of Dahling's Salon & SPA. Dahling's
                    is pretty well-known in Sagay City as one of the most go to
                    salon & spa. The core principles of Dahling's is to provide
                    the customers the quality of the products and services that
                    they are getting from us which led to its success.
                </p>
                <img
                    src="/founder.jpg"
                    alt="Laura, founder of Dahling's Salon & SPA"
                    className="my-8 h-24 w-24 rounded-full border-2 border-[#aa9381]/45 object-cover shadow-[0_8px_20px_rgba(79,60,47,0.15)] sm:h-28 sm:w-28"
                />
                <p className="max-w-md font-serif text-lg leading-7 text-[#66594f] sm:text-xl sm:leading-8">
                    Here, quality is everything.. you are the priority and you
                    matter, while we only serve what you deserve.
                </p>
            </div>
        </div>
    );
});
