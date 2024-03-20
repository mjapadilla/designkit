function ScreenLoader() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen bg-zinc-900">
      <div className="m-auto text-neutral-50">
        <div className="flex items-center justify-center space-x-2">
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <h4 className="text-lg font-medium">Please wait...</h4>
        </div>
      </div>
    </div>
  );
}

export default ScreenLoader;
