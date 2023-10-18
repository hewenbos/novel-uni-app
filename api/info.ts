import uniFetch from '@/utils/request';
import type { infoResponseType } from '@/types/info';
export const getBookInfoListApi = () => {
	return uniFetch.get<infoResponseType>('/readList');
};
