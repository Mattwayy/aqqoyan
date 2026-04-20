/**
 * ─────────────────────────────────────────────────────────────
 *  КОНТРАКТ ДЛЯ БЭКЕНДА — Islamic Finance and Business Forum 2026
 * ─────────────────────────────────────────────────────────────
 *
 *  Все запросы идут через next-auth (login) и /api/register (регистрация).
 *  Base URL задаётся через: NEXT_PUBLIC_API_URL=https://api.your-backend.com
 *
 * ─────────────────────────────────────────────────────────────
 *  ЭНДПОИНТЫ БЭКЕНДА
 * ─────────────────────────────────────────────────────────────
 *
 *  POST /api/register
 *    Body: RegisterPayload
 *    Response 201: { id: string, name: string, email: string }
 *    Response 409: { message: string }  — email уже занят
 *    Response 4xx: { message: string }
 *
 *  POST /api/login
 *    Body: { email: string, password: string }
 *    Response 200: { token?: string, user: UserProfile }
 *    Response 401: { message: string }
 *
 *  GET /api/me
 *    Headers: Authorization: Bearer <token>
 *    Response 200: UserProfile
 *    Response 401: { message: string }
 *
 *  UserProfile: {
 *    id:         string | number
 *    name:       string
 *    surname?:   string
 *    email:      string
 *    phone?:     string
 *    org?:       string
 *    position?:  string
 *    qrPayload?: string    // IFBF2026:{uuid} — генерируется фронтом при регистрации
 *  }
 *
 *  RegisterPayload: см. интерфейс ниже
 * ─────────────────────────────────────────────────────────────
 */

/* ─── Types (shared with backend) ───────────────────────── */
export interface RegisterPayload {
  name:          string
  surname:       string
  phone:         string
  email:         string
  password:      string
  scope?:        string
  org?:          string
  position?:     string
  country?:      string
  city?:         string
  lang?:         string
  comment?:      string
  agreePersonal: boolean
  agreeMedia:    boolean
  qrPayload:     string   // IFBF2026:{uuid} — бэкенд сохраняет для валидации бейджа
}

export interface LoginPayload {
  email:    string
  password: string
}

export interface UserProfile {
  id:         string | number
  name:       string
  surname?:   string
  email:      string
  phone?:     string
  org?:       string
  position?:  string
  qrPayload?: string
}

export interface AuthResponse {
  token?: string
  user:   UserProfile
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body: unknown = null,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
