export interface PaginatedPage<T = unknown> {
  /** array containing the page’s slice of data that you passed to the paginate() function */
  data: T[];
  /** the count of the first item on the page, starting from 0 */
  start: number;
  /** the count of the last item on the page, starting from 0 */
  end: number;
  /** total number of results */
  total: number;
  /** the current page number, starting from 1 */
  currentPage: number;
  /** number of items per page (default: 10) */
  size: number;
  /** number of last page */
  lastPage: number;
  url: {
    /** url of the current page */
    current: string;
    /** url of the previous page (if there is one) */
    prev: string | undefined;
    /** url of the next page (if there is one) */
    next: string | undefined;
    /** url of the first page (if the current page is not the first page) */
    first: string | undefined;
    /** url of the last page (if the current page in not the last page) */
    last: string | undefined;
  };
}

export interface PaginationDisplay {
  firstPage?: string;
  previousOmission?: "…";
  previousPages: string[];
  currentPage: string;
  nextPages: string[];
  nextOmission?: "…";
  lastPage?: string;
}

export const paginationDelta = 1;
export const paginationBaseButton =
  "size-8 lg:size-10 flex justify-center items-center rounded-sm text-base lg:text-xl font-bold";
export const paginationEnabledButton =
  "bg-indigo-500  hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500";
export const paginationEnabledText = "text-white";
export const paginationDisabledText = "text-indigo-500";

export const getPaginationDisplay = (currentPage: number, lastPage: number) => {
  const display: PaginationDisplay = {
    previousPages: [],
    currentPage: currentPage.toString(),
    nextPages: [],
  };

  // ページ数が1ページなら即リターン
  if (lastPage < 2) return display;

  const firstVisiblePage = Math.max(1, currentPage - paginationDelta);
  const lastVisiblePage = Math.min(lastPage, currentPage + paginationDelta);

  // 現在ページが1ページじゃなければ端に1を表示
  if (currentPage - paginationDelta > 1) display.firstPage = "1";

  // 先頭ページまで距離があれば省略記号配置
  if (firstVisiblePage > 1 + paginationDelta) display.previousOmission = "…";

  // 前方向に隣接したページを現在のページ分まで取得
  for (let i = firstVisiblePage; i < currentPage; i++) {
    display.previousPages.push(i.toString());
  }

  // 後ろ方向に隣接したページを現在のページ分まで取得
  for (let i = currentPage + 1; i <= lastVisiblePage; i++) {
    display.nextPages.push(i.toString());
  }

  // 最終ページまで距離があれば省略記号配置
  if (lastVisiblePage < lastPage - paginationDelta) display.nextOmission = "…";

  // 最後ページが表示範囲になければ端に最終ページ番号表示
  if (currentPage < lastPage - paginationDelta) display.lastPage = lastPage.toString();

  return display;
};
