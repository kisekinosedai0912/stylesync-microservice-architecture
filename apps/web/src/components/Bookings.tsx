import { memo, useCallback, useState, type FormEvent } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@stylesync/ui/components/select";
import type { FormType } from "@/utils/types/forms";

const fieldClassName =
    "w-full border-0 border-b border-[#cfc3b9] bg-transparent px-0 py-3 text-sm text-[#433b35] outline-none transition-colors placeholder:text-[#9a8d83] focus:border-[#433b35]";

const services = [
    "Hair styling",
    "Hair treatment",
    "Skin and facial care",
    "Massage and spa ritual",
    "Nail care",
    "Consultation",
];

export default function Bookings() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setSubmitted(true);
        },
        [],
    );

    return (
        <section
            id="booking"
            className="w-full bg-[#f7f4ee] px-5 py-20 text-[#433b35] sm:px-8 sm:py-24 lg:px-16 lg:py-28"
            aria-labelledby="booking-title"
        >
            <div className="mx-auto grid w-full max-w-5xl items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.82fr)] lg:gap-20">
                <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#967d69]">
                        Your time, reserved
                    </p>
                    <h2
                        id="booking-title"
                        className="max-w-xl font-serif text-[clamp(2.5rem,5vw,4.75rem)] font-normal leading-[0.95] tracking-[-0.045em] text-[#544940]"
                    >
                        Book a little time
                        <span className="block italic text-[#967d69]">
                            for yourself.
                        </span>
                    </h2>
                    <p className="mt-7 max-w-lg text-sm leading-7 text-[#66594f]">
                        Tell us what you have in mind and choose your preferred
                        date. Our team will follow up to confirm the best
                        available time for your visit.
                    </p>
                    <BookingForm
                        formState={submitted}
                        submitFunc={handleSubmit}
                    />
                </div>
                <Figure />
            </div>
        </section>
    );
}

function BookingForm({ formState, submitFunc }: FormType) {
    return (
        <form
            className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2"
            onSubmit={submitFunc}
        >
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#79695e]">
                <span id="service-label">Service</span>
                <Select name="service" required>
                    <SelectTrigger
                        className="w-full border-0 border-b border-[#cfc3b9] bg-transparent px-0 py-3 text-sm font-normal normal-case tracking-normal text-[#433b35] shadow-none focus-visible:border-[#433b35] focus-visible:ring-0 data-[size=default]:h-11"
                        aria-labelledby="service-label"
                    >
                        <SelectValue placeholder="Select a treatment" />
                    </SelectTrigger>
                    <SelectContent
                        align="start"
                        className="border-0 bg-white text-[#433b35] ring-[#cfc3b9]"
                    >
                        {services.map((service) => (
                            <SelectItem
                                key={service}
                                value={service}
                                className="py-2.5 text-sm focus:bg-[#f7f4ee] focus:text-[#433b35]"
                            >
                                {service}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[#79695e]">
                Preferred date
                <input
                    className={fieldClassName}
                    type="date"
                    name="date"
                    required
                />
            </label>

            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[#79695e]">
                Full name
                <input
                    className={fieldClassName}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                />
            </label>

            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[#79695e]">
                Mobile number
                <input
                    className={fieldClassName}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+63"
                    required
                />
            </label>

            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[#79695e] sm:col-span-2">
                Notes for your stylist
                <textarea
                    className={`${fieldClassName} min-h-24 resize-y`}
                    name="notes"
                    placeholder="Tell us about your preferred look, timing, or anything we should know."
                />
            </label>

            <div className="mt-3 flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                <button
                    className="inline-flex min-h-12 items-center justify-center gap-8 bg-[#433b35] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#433b35]"
                    type="submit"
                >
                    Request appointment
                    <span aria-hidden="true">↗</span>
                </button>
                <p
                    className="text-xs leading-5 text-[#79695e]"
                    aria-live="polite"
                >
                    {formState
                        ? "Thank you — your request is ready for our team to confirm."
                        : "Requests are confirmed personally by our salon team."}
                </p>
            </div>
        </form>
    );
}

// The form submission state changes independently of this static media panel.
const Figure = memo(function Figure() {
    return (
        <figure className="lg:pt-10">
            <div className="overflow-hidden bg-[#ded6cf] shadow-[0_24px_65px_rgba(79,60,47,0.16)]">
                <img
                    className="aspect-[3/4] w-full object-cover object-center"
                    src="/mac-booking.jpg"
                    alt="MacBook ready to display the future salon booking dashboard"
                />
            </div>
            <figcaption className="mt-5 flex items-start gap-4 border-t border-[#cfc3b9] pt-5">
                <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#967d69]"
                    aria-hidden="true"
                />
                <p className="text-xs leading-5 text-[#79695e]">
                    A first look at the workspace that will soon help our team
                    manage every appointment with care.
                </p>
            </figcaption>
        </figure>
    );
});
