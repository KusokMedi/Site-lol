import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-dark-950 px-4" role="main">
      <div className="text-center space-y-6">
        <div className="font-mono text-7xl sm:text-8xl font-bold gradient-accent-text">
          404
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white/80">
          Страница не найдена
        </h1>
        <p className="text-white/40 text-sm sm:text-base max-w-md mx-auto">
          Такой страницы не существует. Возможно, она была перемещена или удалена.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-dark-950 font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}