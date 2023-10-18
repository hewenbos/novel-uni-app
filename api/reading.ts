import uniFetch from '@/utils/request';
import type { readingResponse } from '@/types/reading';
//获取章节内容
export const getTestContentApi = () => {
	return uniFetch.get<readingResponse>('/testContent');
};
