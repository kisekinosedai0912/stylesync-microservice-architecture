

export default function Header() {
	return (
		<header className="fixed top-0 z-10 flex items-center 
				justify-between h-24 taupe-header w-full px-8 md:px-24"
		>
			<svg
				className="logo"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 300 52"
				role="img"
				aria-label="Dahling's"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="6"
			>
					<path d="M12 10v32h8c16 0 16-32 0-32z" />
					<path d="M45 42 55 10l10 32M50 28h10" />
					<path d="M75 10v32M96 10v32M75 27h21" />
					<path d="M111 10v32h17" />
					<path d="M143 10v32" />
					<path d="M159 42V11l22 31V10" />
					<path d="M215 17c-3-5-7-7-12-7-9 0-15 7-15 16s6 16 15 16c5 0 9-2 12-5V28h-11" />
					<path d="M232 10l-3 8" />
					<path d="M269 15c-3-4-7-5-11-5-7 0-11 3-11 8 0 12 23 5 23 16 0 5-5 8-12 8-5 0-10-2-13-6" />
			</svg>

			<nav className="flex items-center justify-between gap-8 font-bold

			">
				<NavLink link="#" name="Home"/>
				<NavLink link="#" name="Services"/>
				<NavLink link="#" name="Book"/>
				<NavLink link="#" name="Contact"/>
			</nav>
		</header>
	)
}

type LinkNode = {
	link: string,
	name: string
}

function NavLink({ link, name }: LinkNode) {
	return (
		<a href={link}
		   className="nav-link bottom-0"
		>
			{name}
		</a>
	)
}