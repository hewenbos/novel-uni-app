import { createUniFetch } from 'uni-app-fetch';
import { responseData } from '@/types/unifetch';
// 使用自定义选项创建实例
const uniFetch = createUniFetch<responseData>({
	loading: { title: '加载中...' },
	baseURL: 'http://ceshi.dishait.cn',
	intercept: {
		// 请求拦截器
		request(options) {
			return options;
		},
		// 响应拦截器
		response(result) {
			return result;
		}
	}
});
// 模块导出
export default uniFetch;
