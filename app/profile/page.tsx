import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import QRCode from 'qrcode'
import { authOptions } from '@/lib/authOptions'
import Footer from '@/app/components/footer'
import ProfileHeader from '@/app/components/ProfileHeader'
import ProfileContent from '@/app/components/ProfileContent'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/?login=1')

  const user = session.user
  const qrSource = user.qrPayload ?? `IFBF2026:${user.id}`
  const qrSvg = await QRCode.toString(qrSource, {
    type:   'svg',
    margin: 1,
    color:  { dark: '#121e52', light: '#ffffff' },
  })

  return (
    <div className="min-h-screen bg-[#f4f6fb] dark:bg-slate-900 flex flex-col transition-colors">
      <ProfileHeader />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-6">
        <ProfileContent user={user} qrSvg={qrSvg} />
      </main>
      <Footer hideAuthLink />
    </div>
  )
}
