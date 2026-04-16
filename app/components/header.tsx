import logo from "@/public/logo.svg"
import Image from "next/image"

export default function Header() {
  return (
    <div className="flex items-center w-full max-w-[1200px] flex-grow justify-between absolute top-0 z-10 pt-14">
      <Image
        className="relative w-53.75 h-10 aspect-[5.38]"
        alt="logo vector"
        src={logo}
        width={215}
        height={40}
      />
      <button
        type="button"
        className="inline-flex h-10 items-center justify-center gap-2.5 px-10 py-3 relative flex-[0_0_auto] bg-[#f7f9fc0a] rounded-xl border border-solid border-[#f7f9fc59] backdrop-blur-[2px] backdrop-brightness-100 [-webkit-backdrop-filter:blur(2px)_brightness(100%)] cursor-pointer"
      >
        <span className="relative w-fit -mt-1.25 -mb-0.75 font-['Inter-Medium',Helvetica] font-medium text-[#f7f9fc] text-xl text-right tracking-[0] leading-6 whitespace-nowrap">
          Вход / Регистрация
        </span>
      </button>
    </div>
  )
}
