export default function Header() {
    return (
        <header className="hero_header">
            <a className="hero_brand" href="#hero" aria-label="Élan home">
                Dahling's
                <span>salon & spa</span>
            </a>

            <nav className="hero_nav" aria-label="Primary navigation">
                <NavLink link="#about" name="About" />
                <NavLink link="#services" name="Services" />
                <NavLink link="#booking" name="Bookings" />
                <NavLink link="#contact" name="Contact" />
            </nav>

            <a className="hero_menu-link" href="#services">
                Explore
            </a>
        </header>
    );
}

type LinkNode = {
    link: string;
    name: string;
};

function NavLink({ link, name }: LinkNode) {
    return <a href={link}>{name}</a>;
}
