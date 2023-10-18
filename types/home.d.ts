//获取首页轮播图 喜欢getIndexDataApi 人文 ... 响应数据
export type indexDataResponse = {
	Rebooks: RebooksList[];
	bookResources: bookResourcesList[];
	swiperImages: swiperImagesList[];
};

export type RebooksList = {
	id: number;
	name: string;
	src: string;
};

export type bookResourcesList = {
	books: booksList[];
	headerTitle: string;
};

export type booksList = {
	id: number;
	imgurl: string;
	name: string;
	synopsis: string;
};

//轮播图
export type swiperImagesList = {
	src: string;
};
