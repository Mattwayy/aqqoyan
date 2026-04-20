import logo from "@/public/logo.svg"
import Image from "next/image"
import LoginButton from "./LoginButton"

export default function Header() {
  return (
    <header className="header absolute top-0 left-0 right-0 z-10 w-full">
      <div className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between">
        <Image
          alt="logo"
          src={logo}
          width={215}
          height={40}
          className="h-8 sm:h-10 w-auto"
        />
        <LoginButton className="login-button inline-flex h-10 items-center justify-center gap-2.5 px-6 sm:px-10 py-3 bg-white/5 rounded-xl border border-white/35 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors">
          <span className="font-medium text-[#f7f9fc] text-sm sm:text-base whitespace-nowrap">
            Вход / Регистрация
          </span>
        </LoginButton>
      </div>
    </header>
  )
}
