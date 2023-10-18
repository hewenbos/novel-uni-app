import uniFetch from '@/utils/request';
import type { BookListResponse, BookSynopsisResponse } from '@/types/detail';
//获取书籍列表
export const getBookListApi = () => {
	return uniFetch.get<BookListResponse>('/book');
};

//获取书籍章节
export const getBookSynopsisApi = () => {
	return uniFetch.get<BookSynopsisResponse>('/testSynopsis');
};
