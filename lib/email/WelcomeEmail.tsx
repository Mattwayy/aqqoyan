import * as React from 'react'
import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Link, Preview, Font,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
  surname?: string
}

export function WelcomeEmail({ name, surname }: WelcomeEmailProps) {
  const fullName = [name, surname].filter(Boolean).join(' ')

  return (
    <Html lang="ru" dir="ltr">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>
        Вы зарегистрированы на Islamic Finance and Business Forum 2026 — ваш бейдж участника готов
      </Preview>

      <Body style={body}>
        <Container style={container}>

          {/* ── Header ── */}
          <Section style={header}>
            <Heading style={logo}>IFBF <span style={logoAccent}>2026</span></Heading>
            <Text style={headerSub}>Islamic Finance and Business Forum</Text>
          </Section>

          {/* ── Main content ── */}
          <Section style={content}>
            <Heading as="h2" style={greeting}>
              Здравствуйте, {fullName}!
            </Heading>

            <Text style={paragraph}>
              Вы успешно зарегистрированы на{' '}
              <strong>Islamic Finance and Business Forum 2026</strong> —
              международную площадку для диалога, партнёрств и обмена практиками
              в сфере исламских финансов и бизнеса.
            </Text>

            {/* ── Event info box ── */}
            <Section style={infoBox}>
              <Text style={infoRow}>
                <span style={infoLabel}>📅 Дата</span>
                <span style={infoValue}>21 мая 2026 года</span>
              </Text>
              <Hr style={infoHr} />
              <Text style={infoRow}>
                <span style={infoLabel}>📍 Место</span>
                <span style={infoValue}>Астана, Международный финансовый центр «Астана» (МФЦА)</span>
              </Text>
              <Hr style={infoHr} />
              <Text style={infoRow}>
                <span style={infoLabel}>🎫 Бейдж</span>
                <span style={infoValue}>Электронный QR-бейдж доступен в личном кабинете</span>
              </Text>
            </Section>

            <Text style={paragraph}>
              Ваш уникальный QR-код для входа на мероприятие сформирован
              и доступен в личном кабинете на сайте форума. Рекомендуем
              сохранить его заранее или предъявить с экрана смартфона на входе.
            </Text>

            {/* ── CTA ── */}
            <Section style={ctaSection}>
              <Link href="https://ifbforum.kz/profile" style={ctaButton}>
                Перейти в личный кабинет
              </Link>
            </Section>

            <Hr style={divider} />

            <Text style={note}>
              <strong>Важно:</strong> в период с 15 апреля по 31 мая 2026 года
              на взлетно-посадочной полосе аэропорта Астаны проводятся плановые
              ремонтные работы. Полоса будет временно закрыта ежедневно
              с&nbsp;10:00 до&nbsp;18:00 по местному времени. Просим учитывать
              это при планировании поездки.
            </Text>
          </Section>

          {/* ── Footer ── */}
          <Section style={footer}>
            <Text style={footerText}>
              Islamic Finance and Business Forum 2026
            </Text>
            <Text style={footerLinks}>
              <Link href="https://ifbforum.kz" style={footerLink}>ifbforum.kz</Link>
              {' · '}
              <Link href="https://ifbforum.kz/terms" style={footerLink}>Условия использования</Link>
              {' · '}
              <Link href="https://ifbforum.kz/privacy" style={footerLink}>Конфиденциальность</Link>
            </Text>
            <Text style={footerMuted}>
              Это письмо отправлено автоматически. Пожалуйста, не отвечайте на него.
              По вопросам пишите на{' '}
              <Link href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@ifbforum.kz'}`} style={footerLink}>
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@ifbforum.kz'}
              </Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

/* ── Styles ───────────────────────────────────────────────── */
const body: React.CSSProperties = {
  backgroundColor: '#f4f6fb',
  fontFamily: 'Inter, Arial, sans-serif',
  margin: 0,
  padding: '32px 0',
}

const container: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
}

const header: React.CSSProperties = {
  background: 'linear-gradient(135deg, #121e52 0%, #2f4fa3 100%)',
  padding: '36px 40px 28px',
  textAlign: 'center',
}

const logo: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 700,
  margin: '0 0 6px',
  letterSpacing: '-0.5px',
}

const logoAccent: React.CSSProperties = {
  color: '#5fe3e3',
}

const headerSub: React.CSSProperties = {
  color: 'rgba(255,255,255,0.65)',
  fontSize: '13px',
  margin: 0,
  letterSpacing: '0.5px',
}

const content: React.CSSProperties = {
  padding: '36px 40px',
}

const greeting: React.CSSProperties = {
  color: '#121e52',
  fontSize: '22px',
  fontWeight: 700,
  margin: '0 0 20px',
}

const paragraph: React.CSSProperties = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '1.65',
  margin: '0 0 20px',
}

const infoBox: React.CSSProperties = {
  backgroundColor: '#f7f9fc',
  borderRadius: '12px',
  border: '1px solid #e5e9f5',
  padding: '4px 20px',
  margin: '0 0 24px',
}

const infoRow: React.CSSProperties = {
  display: 'flex' as const,
  fontSize: '14px',
  color: '#374151',
  margin: '12px 0',
  lineHeight: '1.5',
}

const infoHr: React.CSSProperties = {
  borderColor: '#e5e9f5',
  margin: '0',
}

const infoLabel: React.CSSProperties = {
  minWidth: '80px',
  color: '#6b7280',
  fontWeight: 500,
  marginRight: '12px',
}

const infoValue: React.CSSProperties = {
  color: '#121e52',
  fontWeight: 500,
  flex: 1,
}

const ctaSection: React.CSSProperties = {
  textAlign: 'center',
  margin: '28px 0',
}

const ctaButton: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#2f4fa3',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600,
  padding: '14px 32px',
  borderRadius: '10px',
  textDecoration: 'none',
  letterSpacing: '0.2px',
}

const divider: React.CSSProperties = {
  borderColor: '#e5e9f5',
  margin: '24px 0',
}

const note: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '1.6',
  margin: '0',
  backgroundColor: '#fffbeb',
  border: '1px solid #fde68a',
  borderRadius: '8px',
  padding: '12px 16px',
}

const footer: React.CSSProperties = {
  backgroundColor: '#f7f9fc',
  borderTop: '1px solid #e5e9f5',
  padding: '24px 40px',
  textAlign: 'center',
}

const footerText: React.CSSProperties = {
  color: '#121e52',
  fontSize: '13px',
  fontWeight: 600,
  margin: '0 0 8px',
}

const footerLinks: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0 0 10px',
}

const footerLink: React.CSSProperties = {
  color: '#2f4fa3',
  textDecoration: 'none',
}

const footerMuted: React.CSSProperties = {
  color: '#9ca3af',
  fontSize: '11px',
  margin: 0,
  lineHeight: '1.5',
}
