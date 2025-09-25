export async function llmCall({ 
  messages, 
  model = "accounts/fireworks/models/llama-v3p1-70b-instruct", 
  temperature = 0.6, 
  max_tokens = 800, 
  timeoutMs = 3000, 
  retries = 1 
}: {
  messages: Array<{ role:"system"|"user"|"assistant"; content:string }>;
  model?: string; 
  temperature?: number; 
  max_tokens?: number; 
  timeoutMs?: number; 
  retries?: number;
}) {
  const url = process.env.AI_GATEWAY_URL!;
  const key = process.env.AI_GATEWAY_API_KEY!;
  
  const attempt = async () => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort("timeout"), timeoutMs);

    try {
      const res = await fetch(`${url}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          model, 
          messages, 
          temperature, 
          max_tokens, 
          stream: false 
        }),
        signal: ctrl.signal,
      });
      
      clearTimeout(t);
      
      if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
      const data = await res.json();
      return data.choices?.[0]?.message?.content ?? "";
    } catch (error) {
      clearTimeout(t);
      throw error;
    }
  };

  for (let i = 0; i <= retries; i++) {
    try { 
      return await attempt(); 
    } catch (e) {
      if (i === retries) throw e;
      // Jittered backoff
      await new Promise(r => setTimeout(r, 250 + Math.random() * 400));
    }
  }
  throw new Error("unreachable");
}
