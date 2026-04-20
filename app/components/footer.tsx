import Image from "next/image"
import logo from "@/public/logo.svg"
import FooterAuthLink from "./FooterAuthLink"

const navLinks = [
  { label: "Главная",                  href: "/#home"        },
  { label: "О форуме",                 href: "/#about"       },
  { label: "Форум в цифрах",           href: "/#stats"       },
  { label: "Почему стоит участвовать", href: "/#participate" },
  { label: "Кому полезен форум",       href: "/#benefits"    },
  { label: "Спикеры",                  href: "/#speakers"    },
  { label: "Партнёры",                 href: "/#partners"    },
  { label: "Программа",                href: "/#programs"    },
]

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d1640] text-[#f7f9fc]">
      {/* Logo bar */}
      <div className="max-w-6xl mx-auto px-5 pt-8 pb-5 border-b border-white/10">
        <Image src={logo} alt="logo" width={215} height={40} className="h-8 sm:h-10 w-auto" />
      </div>

      {/* Main content — stacked on mobile, 3-col on md */}
      <div className="max-w-6xl mx-auto px-5 py-8 md:py-12 flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-12">

        {/* Brand */}
        <div className="flex flex-col gap-3">
          <p className="text-lg sm:text-xl font-bold leading-snug">
            Islamic Finance and Business Forum{" "}
            <span className="text-[#5fe3e3]">2026</span>
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            — международная площадка для обмена опытом, экспертного диалога
            и развития партнерств в сфере исламских финансов и бизнеса.
          </p>
        </div>

        {/* Site map */}
        <div className="flex flex-col gap-3">
          <p className="font-bold text-sm sm:text-base">Карта сайта</p>
          <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 sm:gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-xs sm:text-sm text-white/70 hover:text-[#5fe3e3] transition-colors flex items-center gap-2 before:content-['•'] before:text-white/40">
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-1 col-span-2 sm:col-span-1">
              <FooterAuthLink />
            </li>
          </ul>
        </div>

        {/* Contacts + Socials */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-sm sm:text-base">Контакты</p>
            <div className="flex flex-col gap-1 text-xs sm:text-sm text-white/60">
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL && (
                <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                  className="hover:text-[#5fe3e3] transition-colors">
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                </a>
              )}
              {process.env.NEXT_PUBLIC_CONTACT_PHONE && (
                <a href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                  className="hover:text-[#5fe3e3] transition-colors">
                  {process.env.NEXT_PUBLIC_CONTACT_PHONE}
                </a>
              )}
              {process.env.NEXT_PUBLIC_CONTACT_ADDRESS && (
                <span>{process.env.NEXT_PUBLIC_CONTACT_ADDRESS}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-bold text-sm sm:text-base">Соцсети</p>
            <div className="flex items-center gap-3">
              <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#'}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-white/20 hover:border-[#5fe3e3] hover:bg-white/5 transition-all">
                <Image src="/socials/instagram.svg" alt="Instagram" width={20} height={20} className="object-contain" />
              </a>
              <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '#'}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-white/20 hover:border-[#5fe3e3] hover:bg-white/5 transition-all">
                <Image src="/socials/linkedin.svg" alt="LinkedIn" width={20} height={20} className="object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-5 py-4 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2">
        <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-2">
          Пользовательское соглашение
        </a>
        <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-2">
          Политика конфиденциальности
        </a>
      </div>
    </footer>
  )
}
