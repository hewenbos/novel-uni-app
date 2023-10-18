export type infoResponseType = {
	books: books[];
	isLoadMore: string;
};

export type books = {
	id: number;
	imgurl: string;
	name: string;
	synopsis: string;
};
