/**
 * Server-side in-memory user store — только для локального тестирования.
 *
 * ⚠️  На Vercel (serverless) Map сбрасывается при каждом cold start.
 *     В продакшене выставить NEXT_PUBLIC_API_URL → всё пойдёт в реальный бэкенд.
 */

export interface StoredUser {
  id:        string
  name:      string
  surname:   string
  email:     string
  phone:     string
  org?:      string
  position?: string
  scope?:    string
  country?:  string
  city?:     string
  lang?:     string
  comment?:  string
  _password: string
  qrPayload: string   // IFBF2026:{uuid}  — отправляется бэкенду при регистрации
  visited:   'none' | 'yes'
}

const users = new Map<string, StoredUser>()

export function getUserByEmail(email: string): StoredUser | null {
  for (const user of users.values()) {
    if (user.email.toLowerCase() === email.toLowerCase()) return user
  }
  return null
}

export function getUserById(id: string): StoredUser | null {
  return users.get(id) ?? null
}

export function getUserByQrPayload(qrPayload: string): StoredUser | null {
  for (const user of users.values()) {
    if (user.qrPayload === qrPayload) return user
  }
  return null
}

export function markVisited(id: string): StoredUser | null {
  const user = users.get(id)
  if (!user) return null
  user.visited = 'yes'
  users.set(id, user)
  return user
}

export function createUser(data: Omit<StoredUser, 'id'>): StoredUser {
  const id   = crypto.randomUUID()
  const user: StoredUser = { ...data, id }
  users.set(id, user)
  return user
}

export function getAllUsers(): StoredUser[] {
  return Array.from(users.values())
}

export function deleteUser(id: string): void {
  users.delete(id)
}

export function deleteAllUsers(): void {
  users.clear()
}
