import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { listBook } from '@/types/detail';
export const useCollectStore = defineStore(
	'collect',

	() => {
		const collectList = ref<listBook[]>([]);
		return { collectList };
	},
	{
		persist: true
	}
);
