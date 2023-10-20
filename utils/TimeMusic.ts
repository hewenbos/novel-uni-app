export const FiletimeMusic = (time: number) => {
	let date = new Date(time * 1000);
	const startTime = date.getMinutes();

	let endTime = date.getSeconds();

	return `${startTime > 10 ? startTime : '0' + startTime}:${endTime > 10 ? endTime : '0' + endTime}`;
};

export const HavePlayedTime = (time: number) => {
	let date = new Date(time * 1000);
	const startTime = date.getMinutes();

	let endTime = date.getSeconds();

	return `${startTime < 10 ? '0' + startTime : startTime}:${endTime < 10 ? '0' + endTime : endTime}`;
};
