import * as React from 'react'
import {
  Html, Head, Body, Container, Section,
  Heading, Text, Hr, Link, Preview, Font,
} from '@react-email/components'

interface Props { name: string; surname?: string }

export function WelcomeEmailKz({ name, surname }: Props) {
  return (
    <Html lang="kk" dir="ltr">
      <Head>
        <Font fontFamily="Inter" fallbackFontFamily="Arial"
          webFont={{ url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', format: 'woff2' }}
          fontWeight={400} fontStyle="normal" />
      </Head>
      <Preview>Сіз Islamic Finance and Business Forum 2026 форумына тіркелдіңіз</Preview>
      <Body style={body}>
        <Container style={container}>

          <Section style={header}>
            <Heading style={logo}>IFBF <span style={logoAccent}>2026</span></Heading>
            <Text style={headerSub}>Islamic Finance and Business Forum</Text>
          </Section>

          <Section style={content}>
            <Heading as="h2" style={greeting}>Құрметті қатысушы,</Heading>
            <Text style={paragraph}>
              Islamic Finance and Business Forum 2026 форумына тіркелгеніңіз үшін алғыс білдіреміз.
              Тіркеліміңіз сәтті расталды.
            </Text>
            <Section style={infoBox}>
              <Text style={infoRow}><span style={infoLabel}>📅 Күні</span><span style={infoValue}>2026 жылғы 21 мамыр</span></Text>
              <Hr style={infoHr} />
              <Text style={infoRow}><span style={infoLabel}>🕐 Уақыты</span><span style={infoValue}>09:00–17:00</span></Text>
              <Hr style={infoHr} />
              <Text style={infoRow}><span style={infoLabel}>📍 Орны</span><span style={infoValue}>Астана қ., «Астана» халықаралық қаржы орталығы (ХҚАО), Мәңгілік Ел даңғылы, 55/18 ғимарат, С3.4 блок</span></Text>
            </Section>
            <Text style={paragraph}>
              Форум сайтындағы жеке кабинетіңізде электрондық QR-код қолжетімді.
              Форумға кіру осы код арқылы жүзеге асырылатындықтан, оны алдын ала сақтауыңызды сұраймыз.
            </Text>
            <Section style={ctaSection}>
              <Link href="https://ifbforum.kz/profile" style={ctaButton}>Жеке кабинетке өту</Link>
            </Section>
            <Text style={paragraph}>
              Форумның толық бағдарламасы мен логистикалық мәліметтер форум күні жақындаған сайын электрондық поштаңызға жіберіледі.
              Жаңалықтар мен анонстарды бақылау үшін ресми әлеуметтік желі беттерімізге жазылуды ұсынамыз:
            </Text>
            <Text style={socialText}>
              Instagram: <Link href="https://instagram.com/ifbforum" style={link}>@ifbforum</Link>
              {'  ·  '}
              LinkedIn: <Link href="https://linkedin.com/company/ifbforum" style={link}>Islamic Finance and Business Forum</Link>
            </Text>
            <Text style={paragraph}>Islamic Finance and Business Forum 2026 форумында Сізді қарсы алуға қуаныштымыз.</Text>
            <Text style={note}>
              <strong>Ескерту:</strong> 2026 жылғы 15 сәуірден 31 мамырға дейін Астана әуежайының ұшу-қону жолағында жоспарлы жөндеу жұмыстары жүргізіледі. Осыған байланысты аталған күндері жолақ күнделікті жергілікті уақытпен 10:00-ден 18:00-ге дейін уақытша жабылады. Рейс кестесіндегі ықтимал өзгерістерді ескеріп, маршрутты алдын ала жоспарлауыңызды сұраймыз.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>Islamic Finance and Business Forum 2026</Text>
            <Text style={footerLinks}>
              <Link href="https://ifbforum.kz" style={link}>ifbforum.kz</Link>
              {' · '}
              <Link href="https://ifbforum.kz/terms" style={link}>Пайдаланушы келісімі</Link>
              {' · '}
              <Link href="https://ifbforum.kz/privacy" style={link}>Құпиялылық саясаты</Link>
            </Text>
            <Text style={footerMuted}>Бұл хат автоматты түрде жіберілді. Оған жауап бермеңіз.</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

const body: React.CSSProperties = { backgroundColor: '#f4f6fb', fontFamily: 'Inter, Arial, sans-serif', margin: 0, padding: '32px 0' }
const container: React.CSSProperties = { maxWidth: '560px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }
const header: React.CSSProperties = { background: 'linear-gradient(135deg, #121e52 0%, #2f4fa3 100%)', padding: '36px 40px 28px', textAlign: 'center' }
const logo: React.CSSProperties = { color: '#ffffff', fontSize: '32px', fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.5px' }
const logoAccent: React.CSSProperties = { color: '#5fe3e3' }
const headerSub: React.CSSProperties = { color: 'rgba(255,255,255,0.65)', fontSize: '13px', margin: 0, letterSpacing: '0.5px' }
const content: React.CSSProperties = { padding: '36px 40px' }
const greeting: React.CSSProperties = { color: '#121e52', fontSize: '22px', fontWeight: 700, margin: '0 0 20px' }
const paragraph: React.CSSProperties = { color: '#374151', fontSize: '15px', lineHeight: '1.65', margin: '0 0 20px' }
const infoBox: React.CSSProperties = { backgroundColor: '#f7f9fc', borderRadius: '12px', border: '1px solid #e5e9f5', padding: '4px 20px', margin: '0 0 24px' }
const infoRow: React.CSSProperties = { fontSize: '14px', color: '#374151', margin: '12px 0', lineHeight: '1.5' }
const infoHr: React.CSSProperties = { borderColor: '#e5e9f5', margin: '0' }
const infoLabel: React.CSSProperties = { minWidth: '80px', color: '#6b7280', fontWeight: 500, marginRight: '12px' }
const infoValue: React.CSSProperties = { color: '#121e52', fontWeight: 500 }
const ctaSection: React.CSSProperties = { textAlign: 'center', margin: '28px 0' }
const ctaButton: React.CSSProperties = { display: 'inline-block', backgroundColor: '#2f4fa3', color: '#ffffff', fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '10px', textDecoration: 'none' }
const socialText: React.CSSProperties = { color: '#374151', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px' }
const note: React.CSSProperties = { color: '#6b7280', fontSize: '13px', lineHeight: '1.6', margin: '0', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '12px 16px' }
const footer: React.CSSProperties = { backgroundColor: '#f7f9fc', borderTop: '1px solid #e5e9f5', padding: '24px 40px', textAlign: 'center' }
const footerText: React.CSSProperties = { color: '#121e52', fontSize: '13px', fontWeight: 600, margin: '0 0 8px' }
const footerLinks: React.CSSProperties = { color: '#6b7280', fontSize: '12px', margin: '0 0 10px' }
const link: React.CSSProperties = { color: '#2f4fa3', textDecoration: 'none' }
const footerMuted: React.CSSProperties = { color: '#9ca3af', fontSize: '11px', margin: 0, lineHeight: '1.5' }
