export interface GameData {
  title: string;
  id: string;
  year: number | null;
  description: string;
  imageSrc?: string;
  atwikiUrl?: string;
}

export const games = Array.from({ length: 300 }, (_, i) => {
  const num = i + 1;

  return {
    title: `テスト作品 ${num.toString()}`,
    id: num.toString(),
    year: 2000 + (num % 20),
    description: `テスト作品 ${num.toString()}です。`,
    atwikiUrl: "#",
  };
}) satisfies GameData[];
