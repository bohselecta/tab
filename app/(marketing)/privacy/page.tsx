export default function Privacy() {
  return (
    <div className="container pt-10 space-y-4">
      <h1 className="h1">Privacy Policy</h1>
      <div className="glass p-6 rounded-xl2">
        <p className="p mb-4">
          Tablature.io respects your privacy. This policy explains how we handle your data.
        </p>
        <h2 className="h2 mt-6">Data Collection</h2>
        <p className="p">
          We collect project specifications you create and store them securely in your account.
        </p>
        <h2 className="h2 mt-6">Data Usage</h2>
        <p className="p">
          Your projects are used to provide the service. Published content is sanitized before appearing in the gallery.
        </p>
        <h2 className="h2 mt-6">Data Storage</h2>
        <p className="p">
          Projects are stored securely using Vercel KV. You can delete projects at any time.
        </p>
        <h2 className="h2 mt-6">AI Processing</h2>
        <p className="p">
          Your inputs are processed by AI services to generate outputs. We don't store your inputs beyond what's necessary for the service.
        </p>
      </div>
    </div>
  );
}
