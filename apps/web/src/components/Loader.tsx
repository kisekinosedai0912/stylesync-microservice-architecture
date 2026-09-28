export default function Loader() {
    return (
        <div
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#9b8270] text-[#fffaf3]"
            role="status"
            aria-label="Loading"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(239,213,195,0.22),transparent_32%),linear-gradient(100deg,rgba(62,43,35,0.1),transparent_48%)]"
            />

            <div className="relative flex flex-col items-center gap-5 px-6 text-center">
                <p className="font-serif text-[clamp(2.4rem,5vw,3.4rem)] italic leading-none tracking-[-0.08em]">
                    Dahling&apos;s
                </p>
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-[#fffaf3]/80">
                    salon &amp; spa
                </span>

                <div className="mt-2 flex items-center gap-2" aria-hidden="true">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#fffaf3]/90" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#efe0d2] [animation-delay:160ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e4cbb8] [animation-delay:320ms]" />
                </div>
            </div>
        </div>
    );
}
