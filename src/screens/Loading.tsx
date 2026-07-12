export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-opposite/40">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 animate-spin rounded-full border-6 border-light" />
        <div className="absolute inset-0 animate-spin rounded-full border-6 border-transparent border-t-og-green" />
      </div>

      <p className="text-basic animate-pulse">Loading...</p>
    </div>
  );
};
