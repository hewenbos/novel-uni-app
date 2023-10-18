export type readingResponse = {
	content: content[];
};

export type content = {
	id: number;
	chapter: string;
	text: string;
};
