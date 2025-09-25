import { kv } from '@vercel/kv';

export async function getUserProjects(userId: string): Promise<any[]> {
  const ids: string[] = (await kv.smembers(`u:${userId}:projects`)) || [];
  if (ids.length === 0) return [];
  
  const items = await kv.mget(...ids.map(id => `p:${id}`));
  return items.filter(Boolean);
}

export async function saveProject(spec: any): Promise<void> {
  const userId = 'fake-user'; // In real implementation, get from auth
  await kv.set(`p:${spec.id}`, spec);
  await kv.sadd(`u:${userId}:projects`, spec.id);
}

export async function getProject(id: string): Promise<any | null> {
  return await kv.get(`p:${id}`);
}

export async function publishToGallery(id: string): Promise<void> {
  await kv.sadd("gallery:ids", id);
}

export async function getGalleryItems(): Promise<any[]> {
  const ids: string[] = (await kv.smembers("gallery:ids")) || [];
  if (ids.length === 0) return [];
  
  const items = await kv.mget(...ids.map(id => `p:${id}`));
  return items.filter(Boolean);
}
