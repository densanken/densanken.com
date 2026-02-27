import { Menu, X } from "lucide-react";
import { useState } from "react";

import type { HeaderMenuItem } from "./headerMenuItems";

type Props = {
  menuItems: HeaderMenuItem[];
};

export default function HamburgerMenu({ menuItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = "mobile-menu";

  const menuButtonLabel = isOpen ? "メニューを閉じる" : "メニューを開く";
  const menuContainerClasses = [
    "fixed top-[var(--header-height)] right-0 left-0 z-10 origin-top-right rounded-b-xl border border-zinc-200 bg-white/95 shadow-lg backdrop-blur-sm transition-all duration-200 ease-out",
    isOpen ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-1 scale-95 opacity-0",
  ].join(" ");

  const toggleMenu = () => { setIsOpen((prev) => !prev); };
  const closeMenu = () => { setIsOpen(false); };

  return (
    <div className="flex items-center self-stretch md:hidden">
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={menuButtonLabel}
        className="relative z-20 inline-flex h-full w-8 cursor-pointer items-center justify-center leading-none text-zinc-700"
        onClick={toggleMenu}
        type="button"
      >
        <span className="sr-only">メニューを開く</span>
        <span
          className={`absolute inset-0 inline-flex items-center justify-center transition-all duration-200 ${
            isOpen ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
        >
          <Menu size={20} strokeWidth={2.25} />
        </span>
        <span
          className={`absolute inset-0 inline-flex items-center justify-center transition-all duration-200 ${
            isOpen ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"
          }`}
        >
          <X size={20} strokeWidth={2.25} />
        </span>
      </button>

      <nav aria-label="グローバルメニュー" className={menuContainerClasses} id={menuId}>
        <ul className="grid p-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                className="block border-b border-zinc-300/30 px-3 py-3 text-center text-base font-thin text-zinc-700 hover:border-zinc-300"
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
