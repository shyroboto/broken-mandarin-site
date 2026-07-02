import Artwork3D from "./_components/Artwork3D";

export default function Home() {
  return (
    <main className="relative h-dvh w-full overflow-hidden">
      <div className="vignette" aria-hidden="true" />

      {/* Floating 3D artwork */}
      <Artwork3D />

      {/* CRT scanline texture — sits below the UI text so type stays crisp */}
      <div className="scan z-10" aria-hidden="true" />

      {/* Vertical edge label */}
      <span className="vlabel absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 text-[10px] text-foreground/50 md:block">
        New music dropping soon
      </span>

      {/* Foreground UI */}
      <div className="relative z-20 flex h-full flex-col px-6 md:px-12">
        <nav className="flex items-start justify-between py-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/70">
            brokenmandarin
          </span>
          <div className="text-right">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-orange">
              New Music
            </span>
            <span className="block text-[10px] tracking-[0.3em] uppercase text-foreground/40">
              Vol. 001
            </span>
          </div>
        </nav>

        {/* Wordmark anchored lower-left, overlapping the artwork */}
        <div className="flex flex-1 flex-col justify-end pb-4">
          <p className="mb-5 text-xs tracking-[0.4em] uppercase text-orange">
            — First release
          </p>
          <h1
            className="wordmark glitch-text text-foreground"
            data-text="Broken&#10;Mandarin"
          >
            Broken
            <br />
            Mandarin
          </h1>
        </div>

        <footer className="flex items-end justify-between py-6">
          <p className="max-w-[16ch] text-[10px] leading-relaxed tracking-[0.15em] uppercase text-foreground/40">
            Out July 2026 — stay close
          </p>
          <div className="flex flex-col items-end gap-2">
            <a
              href="https://instagram.com/brokenmandarin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.3em] uppercase text-foreground/70 transition-colors hover:text-orange"
            >
              Instagram ↗ @brokenmandarin
            </a>
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/50">
              © 2026
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
