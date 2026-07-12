type EmptyStateProps = {
  title?: string;
  message?: string;
};

export const EmptyState = ({
  title = 'Empty field!',
  message = 'Even the lacrosse balls are hiding from the summer heat. 🥍 ',
}: EmptyStateProps) => {
  return (
    <div className="flex-1 z-50 flex flex-col items-center justify-center gap-6 bg-og-yellow/90">
      <div className="relative h-20 w-20">
        <div className="absolute bottom-0 left-1/2 h-3 w-12 -translate-x-1/2 rounded-full bg-black/50 blur-sm" />

        <div className="absolute left-1/2 top-0 h-10 w-10 -translate-x-1/2 animate-bounce rounded-full bg-yellow-400 shadow-lg">
          <div className="absolute inset-0 rounded-full shadow-inner" />
        </div>
      </div>

      <h1 className="font-bold">{title}</h1>

      <h2 className="max-w-md text-light">{message}</h2>
    </div>
  );
};
