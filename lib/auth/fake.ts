import { cookies } from 'next/headers';

export function getFakeUser(): string {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('fake-user');
  
  if (!userCookie) {
    const userId = 'guest@tablature.io';
    // Note: In a real implementation, you'd set this cookie
    return userId;
  }
  
  return userCookie.value;
}

export function setFakeUser(email: string): void {
  // Note: In a real implementation, you'd set the cookie here
  // For now, we'll just return the email
}
