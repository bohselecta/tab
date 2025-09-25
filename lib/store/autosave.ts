export async function autosaveSpec(spec: any) {
  try {
    await fetch("/api/projects", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spec) 
    });
  } catch {
    // Silently fail - autosave is best effort
  }
}
