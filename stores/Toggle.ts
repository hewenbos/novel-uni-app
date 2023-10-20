import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useToggleStore = defineStore(
	'toggle',

	() => {
		const ToggleBackgrounds = ref('#f8f9fa');
		const ToggleColor = ref('#2c2c54');

		const musicColor = ref('#fff');

		const toogleMusicColor = () => {
			musicColor.value = musicColor.value == '#fff' ? '#4c5662' : '#fff';
		};
		return { ToggleBackgrounds, ToggleColor, musicColor, toogleMusicColor };
	},
	{
		persist: true
	}
);
