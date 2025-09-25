import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container pt-20 text-center">
      <div className="glass p-8 rounded-xl2 max-w-md mx-auto">
        <h1 className="h1 mb-4">404</h1>
        <p className="p mb-6">Page not found</p>
        <Link href="/studio" className="btn btn-primary">Back to Studio</Link>
      </div>
    </div>
  );
}
