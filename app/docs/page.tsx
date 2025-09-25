export default function Docs() {
  return (
    <div className="container pt-10 space-y-4">
      <h1 className="h1">Docs</h1>
      <p className="p">Tablature helps you plan creative projects and produce copy-ready outputs.</p>
      <h2 className="h2 mt-6">Flows</h2>
      <ul className="p list-disc pl-6">
        <li><b>Video</b>: analyze → pilot (beats & scenes) → export prompts.</li>
        <li><b>Audio</b>: analyze → song brief (+ optional lyrics) → export prompts.</li>
        <li><b>Web</b>: "what if" → site spec → HTML Preview → repo scaffold.</li>
      </ul>
      <h2 className="h2 mt-6">Privacy</h2>
      <p className="p">Autosave stores your specs in your account. Publishing makes a sanitized copy public.</p>
    </div>
  );
}
