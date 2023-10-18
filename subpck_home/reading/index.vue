<template>
	<view class="reading" v-if="readingList && readingList.content && bookInfo">
		<view class="titleBox" v-show="isShow">
			<view class="bookName">
				<navigator open-type="navigateBack">
					<text class="iconfont icon-left"></text>
				</navigator>
				<text>{{ bookInfo.name }}</text>
			</view>
			<text class="bookInfo">{{ comSelectName }}</text>
		</view>
		<swiper :autoplay="false" :current="select" @change="changeChapter">
			<swiper-item v-for="item in readingList.content" :key="item.id">
				<view class="swiper-item" @click="selectStatus" v-html="item.text"></view>
			</swiper-item>
		</swiper>
		<view class="footerBox" v-show="isShow">
			<view class="box-item" @click="popUp">
				<text class="iconfont icon-catalogue icon"></text>
				<view class="text">目录</view>
			</view>
			<view class="box-item" @click="ToggleBackground">
				<text class="iconfont icon-eye icon"></text>
				<view class="text">夜间模式</view>
			</view>
			<view class="box-item">
				<text class="iconfont icon-text icon"></text>
				<view class="text">字体</view>
			</view>
			<view class="box-item">
				<text class="iconfont icon-all icon"></text>
				<view class="text">更多</view>
			</view>
		</view>

		<popup v-if="isPopup" :content="readingList.content"></popup>
	</view>
</template>

<script setup lang="ts">
import { getTestContentApi } from '@/api/reading';
import { onLoad } from '@dcloudio/uni-app';
import type { readingResponse } from '@/types/reading';
import type { BookSynopsisResponse } from '@/types/detail';
import { getBookSynopsisApi } from '@/api/detail';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useToggleStore } from '@/stores/Toggle';
import popup from './components/popup.vue';
const { ToggleBackgrounds, ToggleColor } = storeToRefs(useToggleStore());

onLoad(async (e: { chapterId: string }) => {
	await getTestContent();
	getBookSynopsis();
	select.value = e.chapterId;
	selectChapter(e.chapterId);
});

const select = ref<number | string>(0);

const readingList = ref<readingResponse>();
const getTestContent = async () => {
	const res = await getTestContentApi();
	console.log(res);
	readingList.value = res.data;
};

const selectChapter = (id: string | number) => {
	select.value = readingList.value.content.findIndex((item) => item.id == id);
};

//获取书籍详情
const bookInfo = ref<BookSynopsisResponse>();
const getBookSynopsis = async () => {
	const res = await getBookSynopsisApi();
	console.log(res);
	bookInfo.value = res.data;
};

//切换章节
const changeChapter = (e: CustomEvent) => {
	select.value = e.detail.current;
};

const comSelectName = computed(() => {
	return readingList.value.content[select.value].chapter;
});

const isShow = ref(false);

const selectStatus = () => {
	isShow.value = !isShow.value;
	isPopup.value = false;
};

//切换主题色

const ToggleBackground = () => {
	ToggleBackgrounds.value = ToggleBackgrounds.value == '#f8f9fa' ? '#4c5662' : '#f8f9fa';

	ToggleColor.value = ToggleColor.value == '#2c2c54' ? '#c1cbcd' : '#2c2c54';
};

//显示目录
const isPopup = ref(false);
const popUp = () => {
	isPopup.value = !isPopup.value;
	isShow.value = false;
};
</script>

<style lang="scss">
.reading {
	height: 100vh;
	position: relative;
	background-color: v-bind(ToggleBackgrounds);

	::v-deep uni-swiper {
		height: 100%;
		padding: 0 10rpx;
		.swiper-item {
			height: 100%;
			overflow: scroll;
			color: v-bind(ToggleColor);
		}
	}

	.titleBox {
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		color: v-bind(ToggleColor);
		background-color: v-bind(ToggleBackgrounds);
		z-index: 999;
		animation: identifier1 0.5s linear;

		.bookName {
			font-size: 36rpx;
			display: flex;

			margin-right: 30rpx;
			align-items: center;
			.icon-left {
				font-weight: 600;
				margin-right: 10rpx;
			}
		}
		.bookInfo {
			width: 60%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.footerBox {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 200rpx;
		width: 100%;
		z-index: 999;
		background-color: v-bind(ToggleBackgrounds);
		animation: identifier1 0.2s linear;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 30rpx;
		animation: identifier2 0.5s linear;
		.box-item {
			text-align: center;
			.icon {
				font-size: 54rpx;
			}
			.text {
				font-size: 30rpx;
				color: v-bind(ToggleColor);
				margin-top: 10rpx;
			}
		}
	}
}

@keyframes identifier1 {
	0% {
		margin-top: -80rpx;
	}
	100% {
		margin-top: 0;
	}
}
@keyframes identifier2 {
	0% {
		margin-bottom: -200rpx;
	}
	100% {
		margin-bottom: 0;
	}
}
</style>
