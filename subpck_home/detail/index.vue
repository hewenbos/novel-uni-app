<template>
	<view v-if="bookInfo">
		<navBarRouter title="图书详情" style="background-color: #a8b0c3"></navBarRouter>
		<view class="bookDeatil">
			<image class="imgurl" :src="bookInfo.imgurl" mode=""></image>
			<view class="bookInfo">
				<view class="bookTitle">{{ bookInfo.name }}</view>
				<view class="author">作者 : {{ bookInfo.author }}</view>
				<view class="btn">
					<button class="Share">分享</button>
					<button>收藏</button>
				</view>
			</view>
		</view>
		<view class="tab">
			<view class="tabItem" :class="{ active: active == 0 }" @click="active = 0">详情</view>
			<view class="tabItem" :class="{ active: active == 1 }" @click="active = 1">目录</view>
		</view>
		<view class="footer">
			<swiper :autoplay="false" @change="swiperChange" :current="active" :interval="2000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">
						<view class="intro">——— 简介 ———</view>
						<view class="content">
							{{ bookInfo.synopsis }}
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" v-if="chapterList">
						<view class="chapteritem" @click="goReading(item.id)" v-for="item in chapterList.chapterCatalog" :key="item.id">{{ item.title }}</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script lang="ts" setup>
import navBarRouter from '@/components/navBarRouter/index.vue';
import { getBookListApi, getBookSynopsisApi } from '@/api/detail';
import { onLoad } from '@dcloudio/uni-app';
import type { listBook, BookSynopsisResponse } from '@/types/detail';
import { ref } from 'vue';
onLoad((e: { bookId: string }) => {
	getBookList(e.bookId);
	getBookSynopsis();
});

//获取书籍列表
const bookInfo = ref<listBook>();
const getBookList = async (id: string | number) => {
	const reslut = await getBookListApi();
	bookInfo.value = reslut.data.list.find((item) => item.id == id);

	console.log(bookInfo.value);
};

//切换的状态
const active = ref(0);

//状态改变
const swiperChange = (e: CustomEvent) => {
	console.log(e);
	active.value = e.detail.current;
};

//获取书籍章节
const chapterList = ref<BookSynopsisResponse>();
const getBookSynopsis = async () => {
	const res = await getBookSynopsisApi();
	console.log(res);
	chapterList.value = res.data;
};

//跳转到阅读页面
const goReading = (id: string | number) => {
	uni.navigateTo({
		url: `/subpck_home/reading/index?chapterId=${id}`
	});
};
</script>

<style lang="scss">
.bookDeatil {
	background-color: #a8b0c3;
	height: 290rpx;
	padding: 0 20rpx;
	display: flex;
	align-items: center;
	.imgurl {
		width: 222rpx;
		height: 210rpx;
	}
	.bookInfo {
		flex: 1;
		margin-left: 30rpx;
		.bookTitle {
			font-size: 44rpx;
		}
		.author {
			margin-top: 10rpx;
			font-size: 30rpx;
		}
		.btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 10rpx;
			button {
				flex: 1;
			}
			.Share {
				margin-right: 10rpx;
			}
		}
	}
}

.tab {
	height: 80rpx;
	width: 100%;
	background-color: #fff;
	font-size: 39rpx;
	color: #00000080;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.tabItem.active {
		font-weight: 600;
		position: relative;
		animation: identifier 0.5s linear;
	}

	.active::before {
		content: '';
		width: 100%;
		height: 8rpx;
		background-color: #fb5f39;
		position: absolute;
		border-radius: 4rpx;
		left: 0;
		bottom: -10rpx;

		animation: identifier 0.5s linear;
	}
	@keyframes identifier {
		0% {
			scale: 0.5;
		}
		50% {
			scale: 1.2;
		}
		100% {
			scale: 1;
		}
	}
}

.item {
	width: 100%;
	display: inline-block;
}
.footer {
	height: 882rpx;
	::v-deep uni-swiper {
		height: 100%;
	}
	.swiper-item {
		height: 100%;
		overflow: scroll;
		padding: 0 20rpx;
		.intro {
			text-align: center;
			color: #00000080;
			font-size: 39rpx;
			padding: 20rpx 0;
		}
		.content {
			font-size: 40rpx;
			line-height: 80rpx;
		}

		.chapteritem {
			height: 91rpx;
			border-bottom: 2rpx solid #dee2e6;
			line-height: 91rpx;
		}
	}
}
</style>
