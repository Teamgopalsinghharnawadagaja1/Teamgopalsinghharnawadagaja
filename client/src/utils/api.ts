/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Thin client for the backend REST API (see /server.js). Same-origin '/api'
// is used in production because the Express server serves this built app
// directly. All calls fail soft (return null / false) so the rest of the
// app - which is local-first and works fully offline via localStorage -
// keeps working even if the backend is unreachable.

const API_BASE = '/api';

export interface ApiComplaint {
  id: number;
  case_id: string;
  title: string;
  description: string;
  category: string;
  village: string;
  latitude: number | null;
  longitude: number | null;
  priority: string;
  status: string;
  created_at: string;
}

function getToken(): string | null {
  try {
    return localStorage.getItem('tgs_auth_token');
  } catch {
    return null;
  }
}

function setToken(token: string) {
  try {
    localStorage.setItem('tgs_auth_token', token);
  } catch {
    // ignore storage failures (private browsing, quota, etc.)
  }
}

async function apiFetch(path: string, options: RequestInit = {}): Promise<Response | null> {
  try {
    const token = getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined),
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    return res;
  } catch {
    // Network unavailable / backend offline - caller falls back to local data.
    return null;
  }
}

/** Request an OTP for a 10-digit mobile number. Dev OTP is 123456. */
export async function requestOtp(phone: string): Promise<boolean> {
  const res = await apiFetch('/auth/request-otp', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  });
  return !!res && res.ok;
}

/** Verify OTP and store the returned JWT for subsequent authenticated calls. */
export async function verifyOtp(phone: string, otp: string): Promise<boolean> {
  const res = await apiFetch('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ phone, otp }),
  });
  if (!res || !res.ok) return false;
  const data = await res.json();
  if (data?.token) {
    setToken(data.token);
    return true;
  }
  return false;
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

/**
 * Submit a grievance/complaint to the backend so it is persisted centrally
 * (not just in the citizen's browser). Returns the created complaint's
 * case_id on success, or null if the backend could not be reached / the
 * citizen isn't logged in yet - the caller should treat this as "saved
 * locally only for now" and keep going, since this app must keep working
 * offline as a PWA.
 */
export async function submitComplaintToBackend(input: {
  title: string;
  description: string;
  category: string;
  village: string;
  latitude?: number | null;
  longitude?: number | null;
  priority?: string;
}): Promise<string | null> {
  if (!isLoggedIn()) return null;
  const res = await apiFetch('/complaints', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  if (!res || !res.ok) return null;
  const data = await res.json();
  return data?.case_id ?? null;
}

/** Fetch complaints from the shared backend. Citizens receive only their own complaints; staff can see the shared queue. */
export async function fetchComplaints(query?: { q?: string; status?: string }): Promise<ApiComplaint[]> {
  const params = new URLSearchParams();
  if (query?.q) params.set('q', query.q);
  if (query?.status) params.set('status', query.status);
  const qs = params.toString();
  const res = await apiFetch(`/complaints${qs ? `?${qs}` : ''}`);
  if (!res || !res.ok) return [];
  try {
    return await res.json();
  } catch {
    return [];
  }
}
