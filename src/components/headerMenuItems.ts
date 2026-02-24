export type HeaderMenuItem = {
  href: string;
  label: string;
};

export const HEADER_MENU_ITEMS: HeaderMenuItem[] = [
  { label: "ホーム", href: "/" },
  { label: "活動内容", href: "/activities" },
  { label: "作品紹介", href: "/works" },
  { label: "お知らせ", href: "/news" },
  { label: "blog", href: "/blog" },
  { label: "お問い合わせ", href: "/contact" },
];
