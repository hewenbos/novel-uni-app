import { createPinia } from 'pinia';
import piniaPluginPersistedstate from '@/stores/pisisted';
import type { App } from 'vue';
const pinia = createPinia();
export default function (app: App) {
	pinia.use(piniaPluginPersistedstate);
	app.use(pinia);
}
