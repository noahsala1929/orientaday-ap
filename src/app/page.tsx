export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-start p-6 pt-24 sm:pt-32">
        <div className="flex max-w-2xl flex-col items-center gap-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Benvenuti a{' '}
              <span className="inline-block rounded-lg bg-gradient-primary px-4 py-2 text-primary-foreground">
                OrientaDay
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              La piattaforma per connettere studenti, scuole e aziende.
            </p>
          </div>
        </div>
      </div>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} OrientaDay. All rights reserved.</p>
      </footer>
    </div>
  );
}
