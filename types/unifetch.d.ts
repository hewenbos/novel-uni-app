import uniFetch from '@/utils/request';
interface responseData {
	code: number;
	message: string;
	data: any;
}

declare module 'vue' {
	interface ComponentCustomProperties {
		fetch: typeof uniFetch;
	}
}
