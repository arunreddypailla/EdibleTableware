import type { User } from '../types';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8081';
const AUTH_STORAGE_KEY = 'ediblecart-auth';

export type AuthResponse = {
  token: string;
  user: User;
};

export function getStoredSession(): { token: string; user: User } | null {
  try {
    const storedValue = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedValue) {
      return null;
    }

    return JSON.parse(storedValue) as { token: string; user: User };
  } catch {
    return null;
  }
}

export function saveSession(token: string, user: User) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }));
}

export function clearSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Registration failed.');
  }

  return data as AuthResponse;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Login failed.');
  }

  return data as AuthResponse;
}

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Unable to fetch user.');
  }

  return data.user as User;
}
