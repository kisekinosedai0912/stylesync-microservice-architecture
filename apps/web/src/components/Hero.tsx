import { memo } from "react";

import Header from "./Header";

const benefits = [
    "Personalized care",
    "Premium products",
    "Expert therapists",
    "Serene atmosphere",
];

export default function Hero() {
    return (
        <section className="hero" aria-labelledby="hero-title">
            <Header />
            <div className="hero_intro">
                <p>
                    Thoughtful treatments, quiet rituals, and visible
                    results—created around the needs of your skin.
                </p>
                <a className="hero_cta" href="#booking">
                    Book an appointment
                    <span aria-hidden="true">↗</span>
                </a>
            </div>

            <HeroModel />

            <div className="hero_title-block">
                <p className="hero_eyebrow">Uncover the beauty within...</p>
                <h1 id="hero-title">
                    Come as you are.
                    <em>Leave glowing.</em>
                </h1>
                <p className="hero_support">
                    Relieve, relax, and revive with our salon and spa services
                    designed to bring out your natural
                </p>
            </div>

            <div className="hero_ticker" aria-label="Studio benefits">
                {benefits.map((benefit) => (
                    <span key={benefit}>
                        {benefit}
                        <i aria-hidden="true">✦</i>
                    </span>
                ))}
            </div>
        </section>
    );
}

const HeroModel = memo(function HeroModel() {
    return (
        <img
            className="hero_model"
            src="/model.png"
            alt="Woman relaxing during a beauty ritual"
            loading="lazy"
        />
    );
});
