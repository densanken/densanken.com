import type { Page } from "astro";

export type PaginatedPage<T = unknown> = Page<T>;

// 先頭/末尾と隣接ページの間に入る枠。
// 省略ページが1つだけならページ番号、複数なら "ellipsis" で ... を表示する。
export type PaginationGap = number | "ellipsis";

export interface PaginationSlots {
  firstPage?: number;
  previousGap?: PaginationGap;
  previousPages: number[];
  currentPage: number;
  nextPages: number[];
  nextGap?: PaginationGap;
  lastPage?: number;
}

// 現在ページの左右に何ページ分の番号を直接表示するか。
// 1 の場合は 1 ... 4 [5] 6 ... 10 のように、現在ページの前後1ページを表示する。
export const paginationDelta = 1;

// Mobile / Desktop でページネーションの見た目を揃えるための共通クラス。
export const paginationBaseButton =
  "size-8 lg:size-10 flex justify-center items-center rounded-sm text-base lg:text-xl font-bold";
export const paginationEnabledButton =
  "bg-indigo-500  hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500";
export const paginationEnabledText = "text-white";
export const paginationDisabledText = "text-indigo-500";

const createGap = (firstOmittedPage: number, lastOmittedPage: number): PaginationGap | undefined => {
  const omittedPageCount = lastOmittedPage - firstOmittedPage + 1;

  if (omittedPageCount <= 0) return undefined;

  // 省略されるページが1つだけなら、... ではなくページ番号を直接表示する。
  if (omittedPageCount === 1) return firstOmittedPage;

  return "ellipsis";
};

const createPageNumbers = (firstPage: number, lastPage: number) => {
  const pageNumbers: number[] = [];
  for (let pageNumber = firstPage; pageNumber <= lastPage; pageNumber++) {
    pageNumbers.push(pageNumber);
  }

  return pageNumbers;
};

export const getPaginationSlots = (currentPage: number, lastPage: number): PaginationSlots => {
  // currentPage の左右だけを delta で決める。端に近くても数字を増やさず、足りない枠は Desktop 側で空枠にする。
  const firstAdjacentPage = Math.max(1, currentPage - paginationDelta);
  const lastAdjacentPage = Math.min(lastPage, currentPage + paginationDelta);

  return {
    firstPage: firstAdjacentPage > 1 ? 1 : undefined,
    previousGap: createGap(2, firstAdjacentPage - 1),
    previousPages: createPageNumbers(firstAdjacentPage, currentPage - 1),
    currentPage,
    nextPages: createPageNumbers(currentPage + 1, lastAdjacentPage),
    nextGap: createGap(lastAdjacentPage + 1, lastPage - 1),
    lastPage: lastAdjacentPage < lastPage ? lastPage : undefined,
  };
};

const stripTrailingSlash = (url: string) => (url.length > 1 ? url.replace(/\/$/, "") : url);

export const getPageUrl = (page: PaginatedPage, pageNumber: number) => {
  // Astro の page.url は current/prev/next/first/last だけで、任意ページ番号のURL一覧ではない。
  // まず Astro が持つURLを優先し、隣接ページ以外は先頭ページURLから組み立てる。
  if (pageNumber === page.currentPage) return page.url.current;
  if (pageNumber === 1) return page.url.first ?? page.url.current;
  if (pageNumber === page.lastPage && page.url.last) return page.url.last;
  if (pageNumber === page.currentPage - 1 && page.url.prev) return page.url.prev;
  if (pageNumber === page.currentPage + 1 && page.url.next) return page.url.next;

  const firstPageUrl = stripTrailingSlash(page.url.first ?? page.url.current);
  return `${firstPageUrl === "/" ? "" : firstPageUrl}/${pageNumber.toString()}`;
};
