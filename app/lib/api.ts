/**
 * ─────────────────────────────────────────────────────────────
 *  API CLIENT  —  Islamic Finance and Business Forum 2026
 * ─────────────────────────────────────────────────────────────
 *
 *  Base URL задаётся через переменную окружения:
 *    NEXT_PUBLIC_API_URL=https://api.your-backend.com
 *
 *  Если переменная пустая или равна "mock" — используется
 *  фейковая БД (localStorage) для локального тестирования.
 *
 *  Токен хранится в localStorage под ключом "auth_token".
 *  Авторизованные запросы добавляют заголовок:
 *    Authorization: Bearer <token>
 *
 * ─────────────────────────────────────────────────────────────
 *  КОНТРАКТ ДЛЯ БЕКЕНДА
 * ─────────────────────────────────────────────────────────────
 *
 *  1. POST /api/register
 *     Content-Type: application/json
 *     Body: {
 *       name: string           // обязательно
 *       surname: string        // обязательно
 *       phone: string          // обязательно
 *       email: string          // обязательно, уникальный
 *       scope?: string
 *       org?: string
 *       position?: string
 *       country?: string
 *       city?: string
 *       lang?: string
 *       comment?: string
 *       agreePersonal: boolean // обязательно, должно быть true
 *       agreeMedia: boolean
 *     }
 *     Response 201: { token: string, user: UserProfile }
 *     Response 4xx: { message: string } | { error: string }
 *
 *  2. POST /api/login
 *     Body: { email: string, password: string }
 *     Response 200: { token: string, user: UserProfile }
 *     Response 401: { message: string } | { error: string }
 *
 *  3. GET /api/me
 *     Authorization: Bearer <token>
 *     Response 200: UserProfile
 *     Response 401: { message: string } | { error: string }
 *
 *  4. POST /api/logout
 *     Authorization: Bearer <token>
 *     Response 200: {} | { message: string }
 *
 *  UserProfile: {
 *    id: string | number
 *    name: string
 *    surname?: string
 *    email: string
 *    phone?: string
 *    org?: string
 *    position?: string
 *  }
 *
 *  Формат ошибок: { "message": "..." } или { "error": "..." }
 * ─────────────────────────────────────────────────────────────
 */

import {
  mockRegister,
  mockLogin,
  mockGetMe,
} from './mockDb'

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '')
const TOKEN_KEY = 'auth_token'
const IS_MOCK = !BASE_URL || BASE_URL === 'mock'

/* ─── Token helpers ──────────────────────────────────────── */
export const tokenStorage = {
  get(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(TOKEN_KEY)
  },
  set(token: string) {
    if (typeof window === 'undefined') return
    localStorage.setItem(TOKEN_KEY, token)
  },
  clear() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(TOKEN_KEY)
  },
}

/* ─── Core request ───────────────────────────────────────── */
async function request<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string>),
  }
  if (auth) {
    const token = tokenStorage.get()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers })
  const text = await res.text()
  const data = text ? JSON.parse(text) : {}

  if (!res.ok) {
    throw new ApiError(data?.message ?? data?.error ?? `Ошибка ${res.status}`, res.status, data)
  }

  return data as T
}

export class ApiError extends Error {
  constructor(message: string, public status: number, public body: unknown = null) {
    super(message)
    this.name = 'ApiError'
  }
}

/* ─── Types ──────────────────────────────────────────────── */
export interface RegisterPayload {
  name: string
  surname: string
  phone: string
  email: string
  scope?: string
  org?: string
  position?: string
  country?: string
  city?: string
  lang?: string
  comment?: string
  agreePersonal: boolean
  agreeMedia: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface UserProfile {
  id: string | number
  name: string
  surname?: string
  email: string
  phone?: string
  org?: string
  position?: string
}

export interface AuthResponse {
  token: string
  user: UserProfile
}

/* ─── Auth endpoints ─────────────────────────────────────── */
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const data = IS_MOCK
    ? await mockRegister(payload)
    : await request<AuthResponse>('/api/register', { method: 'POST', body: JSON.stringify(payload) })

  if (data.token) tokenStorage.set(data.token)
  return data
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const data = IS_MOCK
    ? await mockLogin(payload)
    : await request<AuthResponse>('/api/login', { method: 'POST', body: JSON.stringify(payload) })

  if (data.token) tokenStorage.set(data.token)
  return data
}

export async function getMe(): Promise<UserProfile> {
  if (IS_MOCK) {
    const token = tokenStorage.get()
    if (!token) throw new ApiError('Не авторизован.', 401)
    return mockGetMe(token)
  }
  return request<UserProfile>('/api/me', { method: 'GET' }, true)
}

export async function logout(): Promise<void> {
  if (!IS_MOCK) {
    try {
      await request('/api/logout', { method: 'POST' }, true)
    } catch { /* ignore */ }
  }
  tokenStorage.clear()
}
