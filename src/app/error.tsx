"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 justify-center h-screen">
      <h2 className="to-error">{error.message || "Something went wrong"}</h2>
      <button onClick={() => reset()} className="btn btn-error">
        Try again
      </button>
    </div>
  );
}
