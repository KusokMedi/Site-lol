"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-dark-950 px-4" role="main">
      <div className="text-center space-y-6">
        <div className="font-mono text-6xl sm:text-8xl font-bold gradient-accent-text">
          Ошибка
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-white/80">
          Что-то пошло не так
        </h1>
        <p className="text-white/40 text-sm sm:text-base max-w-md">
          {error.message || "Произошла непредвиденная ошибка. Попробуйте обновить страницу."}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-dark-950 font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow"
        >
          Попробовать снова
        </button>
      </div>
    </main>
  );
}