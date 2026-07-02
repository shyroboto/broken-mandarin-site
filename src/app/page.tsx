export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-6 md:px-12">
      <nav className="flex items-center justify-between py-8">
        <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/30">
          brokenmandarin
        </span>
      </nav>

      <section className="flex flex-1 flex-col justify-center py-16">
        <p className="mb-8 text-xs tracking-[0.4em] uppercase text-accent">
          — New Music
        </p>
        <h1 className="wordmark text-foreground">
          Broken<br />Mandarin
        </h1>
        <div className="mt-10 h-px w-full bg-foreground/10" />
        <p className="mt-8 text-xs tracking-[0.5em] uppercase text-foreground/40">
          July 2026
        </p>
      </section>

      <footer className="py-8">
        <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/20">
          © 2026 brokenmandarin
        </p>
      </footer>
    </main>
  );
}
