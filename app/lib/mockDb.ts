  /**
 * Fake in-browser DB for testing.
 * Users are stored in localStorage under "mock_users".
 * Tokens are just base64-encoded user IDs.
 */

import type { RegisterPayload, LoginPayload, AuthResponse, UserProfile } from './api'

const STORE_KEY = 'mock_users'

interface StoredUser extends UserProfile {
  _password: string
}
const DELAY = 600 // ms — simulates network latency

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

function makeToken(id: string) {
  return btoa(`mock:${id}:${Date.now()}`)
}

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(STORE_KEY, JSON.stringify(users))
}

function toProfile(u: StoredUser): UserProfile {
  const { _password: _, ...profile } = u
  return profile
}

/* ─── Register ───────────────────────────────────────────── */
export async function mockRegister(payload: RegisterPayload): Promise<AuthResponse> {
  await sleep(DELAY)

  const users = getUsers()

  if (users.find(u => u.email === payload.email)) {
    throw new Error('Пользователь с таким email уже зарегистрирован.')
  }

  const stored: StoredUser = {
    id: crypto.randomUUID(),
    name: payload.name,
    surname: payload.surname,
    email: payload.email,
    phone: payload.phone,
    org: payload.org,
    position: payload.position,
    _password: payload.password,
  }

  saveUsers([...users, stored])
  const user = toProfile(stored)

  return { token: makeToken(String(user.id)), user }
}

/* ─── Login ──────────────────────────────────────────────── */
export async function mockLogin(payload: LoginPayload): Promise<AuthResponse> {
  await sleep(DELAY)

  const users = getUsers()
  const user = users.find(u => u.email === payload.email)

  if (!user) {
    throw new Error('Неверный email или пароль.')
  }

  if (!payload.password || payload.password !== user._password) {
    throw new Error('Неверный email или пароль.')
  }

  return { token: makeToken(String(user.id)), user: toProfile(user) }
}

/* ─── Get me ─────────────────────────────────────────────── */
export async function mockGetMe(token: string): Promise<UserProfile> {
  await sleep(DELAY)

  const id = atob(token).split(':')[1]
  const user = getUsers().find(u => String(u.id) === id)

  if (!user) throw new Error('Пользователь не найден.')
  return toProfile(user)
}

/* ─── Clear all (for dev reset) ─────────────────────────── */
export function mockClearAll() {
  localStorage.removeItem(STORE_KEY)
}
