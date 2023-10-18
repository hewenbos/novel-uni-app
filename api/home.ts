import uniFetch from '@/utils/request';
import type { indexDataResponse } from '@/types/home';
//获取首页轮播图 喜欢 人文 ...
export const getIndexDataApi = () => {
	return uniFetch.get<indexDataResponse>('/app_index');
};
