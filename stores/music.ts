import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { musicResourecs } from '@/types/home';
export const useMusicStore = defineStore(
	'music',
	() => {
		const musicList = ref<musicResourecs[]>([]);
		const musicInfo = ref<musicResourecs>();
		const collectMusic = ref<musicResourecs[]>([]);

		const nextMusic = () => {
			let index = musicList.value.findIndex((item) => item.id == musicInfo.value.id);
			index++;
			if (index > musicList.value.length - 1) {
				index = 0;
			}
			musicInfo.value = musicList.value[index];
		};

		const PreviousMusic = () => {
			let index = musicList.value.findIndex((item) => item.id == musicInfo.value.id);
			index--;
			if (index < 0) {
				index = musicList.value.length - 1;
			}
			musicInfo.value = musicList.value[index];
		};
		return { musicList, musicInfo, nextMusic, PreviousMusic, collectMusic };
	},
	{
		persist: true
	}
);
