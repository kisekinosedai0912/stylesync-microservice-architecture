import { Suspense, type ReactNode } from "react"

type LayoutProps = {
	children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<main>
			<Suspense 
				fallback={
					<div className="flex items-center justify-center min-h-screen bg-[#050515]">
						<div className="flex items-center gap-2" role="status" aria-label="Loading">
							<span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#6162ff] to-[#b352ff] animate-pulse" />
							<span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#6162ff] to-[#b352ff] animate-pulse [animation-delay:150ms]" />
							<span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#6162ff] to-[#b352ff] animate-pulse [animation-delay:300ms]" />
						</div>
					</div>
				}
			/>
			{ children }
		</main>
	)
}