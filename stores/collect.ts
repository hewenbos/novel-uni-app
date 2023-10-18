import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useCollectStore = defineStore(
	'collect',

	() => {
		const collectList = ref([]);
		return { collectList };
	},
	{
		persist: true
	}
);
