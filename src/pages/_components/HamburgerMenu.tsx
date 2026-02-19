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
    <div className="relative md:hidden">
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
        className="relative z-20 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-900"
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
        className={`absolute top-[calc(100%+4px)] right-0 z-20 w-[min(12rem,calc(100vw-2.5rem))] rounded-xl border border-zinc-200 bg-white p-2 shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
        id="mobile-menu"
      >
        <ul className="grid gap-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                className="block rounded-lg px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-100"
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
