import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useToggleStore = defineStore(
	'toggle',

	() => {
		const ToggleBackgrounds = ref('#f8f9fa');
		const ToggleColor = ref('#2c2c54');
		return { ToggleBackgrounds, ToggleColor };
	},
	{
		persist: true
	}
);
