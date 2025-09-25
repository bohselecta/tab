import { v4 as uuid } from 'uuid';

export function generateId(): string {
  return uuid();
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
