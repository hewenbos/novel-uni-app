import { createPersistedState } from 'pinia-plugin-persistedstate';

const piniaPluginPersistedstate = createPersistedState({
	key: (id) => `__persisted__${id}`,
	storage: {
		getItem(key: string) {
			return uni.getStorageSync(key);
		},
		setItem(key: string, value: any) {
			return uni.setStorageSync(key, value);
		}
	}
});

export default piniaPluginPersistedstate;
