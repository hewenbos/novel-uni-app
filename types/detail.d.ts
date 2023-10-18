export type BookListResponse = {
	list: listBook[];
};
export type listBook = {
	author: string;
	id: 1000;
	imgurl: string;
	name: string;
	synopsis: string;
};

export type BookSynopsisResponse = {
	author: string;
	chapterCatalog: chapterCatalogList[];
	name: string;
	synopsis: string;
};

export type chapterCatalogList = {
	id: number;
	title: string;
};
