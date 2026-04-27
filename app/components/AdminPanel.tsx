'use client'

import { useState, useCallback } from 'react'

interface UserRow {
  id:        string
  name:      string
  surname:   string
  email:     string
  phone:     string
  org?:      string
  position?: string
  country?:  string
  city?:     string
  lang?:     string
  qrPayload: string
}

export default function AdminPanel() {
  const [users,    setUsers]    = useState<UserRow[]>([])
  const [total,    setTotal]    = useState<number | null>(null)
  const [loading,  setLoading]  = useState(false)
  const [dlLoading,setDlLoading]= useState(false)
  const [error,    setError]    = useState<string | null>(null)
  const [lastSync, setLastSync] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/users', { cache: 'no-store' })
      if (!res.ok) throw new Error(`Ошибка ${res.status}`)
      const data = await res.json()
      setUsers(data.users ?? [])
      setTotal(data.total ?? 0)
      setLastSync(new Date().toLocaleTimeString('ru-RU'))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки')
    } finally {
      setLoading(false)
    }
  }, [])

  const downloadExcel = async () => {
    setDlLoading(true)
    try {
      const res = await fetch('/api/admin/export')
      if (!res.ok) throw new Error(`Ошибка ${res.status}`)
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `ifbf-users-${new Date().toISOString().slice(0, 10)}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка экспорта')
    } finally {
      setDlLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 sm:p-8 flex flex-col gap-6 transition-colors">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
              <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>
              ADMIN
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#121e52] dark:text-white">Участники форума</h2>
          {total !== null && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Всего: <span className="font-semibold text-[#2f4fa3] dark:text-[#5fe3e3]">{total}</span>
              {lastSync && <span className="ml-3">· обновлено в {lastSync}</span>}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-2 h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition disabled:opacity-50"
          >
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={loading ? 'animate-spin' : ''}
            >
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            {loading ? 'Загрузка...' : 'Обновить'}
          </button>

          <button
            onClick={downloadExcel}
            disabled={dlLoading}
            className="flex items-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] text-sm font-semibold text-white shadow hover:opacity-90 transition disabled:opacity-50"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {dlLoading ? 'Экспорт...' : 'Скачать Excel'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && users.length === 0 && !error && (
        <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
          {total === null
            ? 'Нажмите «Обновить» чтобы загрузить список участников'
            : 'Зарегистрированных участников пока нет'}
        </div>
      )}

      {/* Table */}
      {users.length > 0 && (
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                <th className="pb-3 pr-4 font-medium">#</th>
                <th className="pb-3 pr-4 font-medium">ФИО</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Телефон</th>
                <th className="pb-3 pr-4 font-medium">Организация</th>
                <th className="pb-3 pr-4 font-medium">Страна</th>
                <th className="pb-3 font-medium">Язык</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {users.map((u, i) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-3 pr-4 text-slate-400 dark:text-slate-500">{i + 1}</td>
                  <td className="py-3 pr-4 font-medium text-[#121e52] dark:text-white whitespace-nowrap">
                    {u.name} {u.surname}
                  </td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">{u.email}</td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">{u.phone}</td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-300 max-w-[180px] truncate">{u.org ?? '—'}</td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">{u.country ?? '—'}</td>
                  <td className="py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase">
                      {u.lang ?? '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
