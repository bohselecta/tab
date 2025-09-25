"use client";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container pt-20 text-center">
      <div className="glass p-8 rounded-xl2 max-w-md mx-auto">
        <h1 className="h1 mb-4">Something went wrong</h1>
        <p className="p mb-6">An error occurred while processing your request.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn btn-primary">Try again</button>
          <Link href="/studio" className="btn">Back to Studio</Link>
        </div>
      </div>
    </div>
  );
}
