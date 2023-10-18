import pinia from './pinia';

import type { App } from 'vue';

export default {
	install(app: App) {
		app.use(pinia);
	}
};
