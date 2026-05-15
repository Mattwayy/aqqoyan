# Backend API Contract — IFBF 2026

Фронтенд на Next.js. Все запросы к внешнему бэкенду проксируются через Next.js API Routes.  
Base URL задаётся переменной окружения: `NEXT_PUBLIC_API_URL=https://api.your-backend.com`  
Если переменная пустая или равна `mock` — используется локальная in-memory БД (только для dev).

Авторизация запросов к бэкенду: `X-API-Key: <BACKEND_API_KEY>`

---

## Роли пользователей

| Роль     | Описание                                                  | Где задаётся          |
|----------|-----------------------------------------------------------|-----------------------|
| `user`   | Обычный участник форума                                   | По умолчанию          |
| `admin`  | Доступ к панели управления участниками                    | `ADMIN_EMAILS` в env  |
| `worker` | Волонтёр/сотрудник — отмечает посещения через QR-сканер  | `WORKER_EMAILS` в env |

Роли определяются на фронтенде по email при логине — бэкенд хранить роль **не обязан**.

---

## Эндпоинты

### POST `/api/register`

Регистрация нового участника.

**Body:**
```json
{
  "name":          "Иван",
  "surname":       "Иванов",
  "email":         "ivan@example.com",
  "phone":         "+7 700 000 00 00",
  "password":      "secret",
  "agreePersonal": true,
  "org":           "ТОО Компания",
  "position":      "Директор",
  "scope":         "Исламские финансы",
  "country":       "Kazakhstan",
  "city":          "Алматы",
  "lang":          "ru",
  "qrPayload":     "IFBF2026:550e8400-e29b-41d4-a716-446655440000"
}
```

> `qrPayload` генерируется фронтендом в формате `IFBF2026:{uuid}`.  
> Бэкенд **обязан сохранить** его — он используется для валидации при сканировании бейджей.

**Response 201:**
```json
{ "id": "string", "name": "string", "email": "string" }
```

**Response 409:** email уже занят  
**Response 4xx:** `{ "message": "string" }`

---

### POST `/api/login`

**Body:**
```json
{ "email": "ivan@example.com", "password": "secret" }
```

**Response 200:**
```json
{
  "token": "jwt-or-session-token",
  "user": {
    "id":         "string",
    "name":       "string",
    "surname":    "string",
    "email":      "string",
    "phone":      "string",
    "org":        "string",
    "position":   "string",
    "qrPayload":  "IFBF2026:uuid",
    "visited":    "none"
  }
}
```

**Response 401:** неверный email или пароль

---

### GET `/api/me`

Получить профиль текущего пользователя.

**Headers:** `Authorization: Bearer <token>`

**Response 200:** объект `UserProfile` (см. выше)

---

### GET `/api/users`

Список всех пользователей (только для admin).

**Query params:**
- `limit` — количество записей (по умолчанию 10000)
- `page` — страница
- `per_page` — записей на страницу
- `qrPayload` — фильтр по qrPayload (используется при сканировании)

**Headers:** `X-API-Key: <BACKEND_API_KEY>`

**Response 200:**
```json
{
  "users": [ ...UserProfile[] ],
  "total": 42
}
```

---

### PATCH `/api/users/:id`

Обновить данные пользователя. Используется воркером для отметки посещения.

**Headers:** `X-API-Key: <BACKEND_API_KEY>`

**Body:**
```json
{ "visited": "yes" }
```

**Response 200:** обновлённый `UserProfile`  
**Response 404:** пользователь не найден

---

### DELETE `/api/users/:id`

Удалить пользователя (только для admin).

**Headers:** `X-API-Key: <BACKEND_API_KEY>`

**Response 200:** `{ "message": "ok" }`

---

### DELETE `/api/users` (bulk)

Удалить всех пользователей.

**Headers:** `X-API-Key: <BACKEND_API_KEY>`

**Response 200:** `{ "message": "ok" }`

---

## Поле `visited`

| Значение | Смысл                              |
|----------|------------------------------------|
| `"none"` | Участник ещё не отметился (дефолт) |
| `"yes"`  | Участник отсканировал бейдж        |

Поле выставляется через `PATCH /api/users/:id` с `{ "visited": "yes" }`.  
Поиск пользователя при скане идёт через `GET /api/users?qrPayload=IFBF2026:uuid`.

---

## UserProfile (полный объект)

```ts
{
  id:         string | number
  name:       string
  surname?:   string
  email:      string
  phone?:     string
  org?:       string
  position?:  string
  scope?:     string
  country?:   string
  city?:      string
  lang?:      string          // "ru" | "en" | "kz"
  qrPayload?: string          // "IFBF2026:{uuid}"
  visited?:   "none" | "yes"
}
```

---

## Переменные окружения (фронтенд)

| Переменная              | Описание                                              |
|-------------------------|-------------------------------------------------------|
| `NEXT_PUBLIC_API_URL`   | Base URL бэкенда. Пусто или `mock` → dev-режим       |
| `BACKEND_API_KEY`       | Ключ для server-to-server запросов (`X-API-Key`)      |
| `NEXTAUTH_SECRET`       | Секрет для подписи JWT (openssl rand -base64 32)      |
| `NEXTAUTH_URL`          | Публичный URL сайта (для продакшена)                  |
| `ADMIN_EMAILS`          | Через запятую — emails с ролью admin                  |
| `WORKER_EMAILS`         | Через запятую — emails с ролью worker                 |
