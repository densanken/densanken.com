import { Menu, X } from "lucide-react";
import { useState } from "react";

type MenuItem = {
  label: string;
  href: string;
};

type Props = {
  menuItems: MenuItem[];
};

export default function HamburgerMenu({ menuItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative sm:hidden">
      {isOpen && (
        <button
          aria-label="メニューを閉じる"
          className="fixed inset-0 z-10 bg-transparent"
          onClick={() => {
            setIsOpen(false);
          }}
          type="button"
        />
      )}

      <button
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        className="relative z-30 inline-flex h-8 w-8 cursor-pointer items-center justify-center text-zinc-900"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        type="button"
      >
        <span className="sr-only">メニューを開く</span>
        <span className={isOpen ? "hidden" : "inline-flex"}>
          <Menu size={20} strokeWidth={2.25} />
        </span>
        <span className={isOpen ? "inline-flex" : "hidden"}>
          <X size={20} strokeWidth={2.25} />
        </span>
      </button>

      <nav
        aria-label="グローバルメニュー"
        className={`pointer-events-none fixed inset-0 z-20 bg-white/30 backdrop-blur-sm backdrop-saturate-150 ${
          isOpen ? "block" : "hidden"
        }`}
        id="mobile-menu"
      >
        <ul className="pointer-events-auto grid px-20 pt-24">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                className="block w-full border-b border-zinc-300/30 px-3 py-3 text-center text-lg font-medium text-zinc-700 hover:border-zinc-300"
                href={item.href}
                onClick={() => {
                  setIsOpen(false);
                }}
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
