export default function Design2Page() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="max-w-4xl text-center">
        <h1 className="font-display text-5xl md:text-7xl font-bold text-primary mb-6">
          CIUDAD VENECIA
        </h1>
        <p className="text-2xl text-text-secondary mb-8">
          Diseño Alternativo (Versión Aura Build)
        </p>
        <div className="bg-white border-2 border-primary/20 p-12">
          <p className="text-lg text-text-primary mb-4">
            🚧 Esta página está lista para recibir el código exportado desde <strong>Aura Build</strong>.
          </p>
          <p className="text-text-secondary">
            Cuando tengas el diseño completo, solo pásame los archivos y lo integro aquí sin tocar tu home actual.
          </p>
        </div>
        <a 
          href="/" 
          className="inline-block mt-8 px-8 py-3 bg-primary text-white uppercase tracking-wider hover:bg-primary-dark transition-colors"
        >
          ← Volver al Home Original
        </a>
      </div>
    </main>
  );
}
