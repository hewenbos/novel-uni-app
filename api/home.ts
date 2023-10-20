import uniFetch from '@/utils/request';
import type { indexDataResponse, MusicListResponse } from '@/types/home';
//获取首页轮播图 喜欢 人文 ...
export const getIndexDataApi = () => {
	return uniFetch.get<indexDataResponse>('/app_index');
};

//获取音频
export const getMusicListApi = () => {
	return uniFetch.get<MusicListResponse>('/musicResourecs');
};
