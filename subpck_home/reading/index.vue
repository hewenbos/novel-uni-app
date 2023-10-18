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
				<view class="swiper-item" @click="selectStatus" v-html="item.text" :style="{ 'font-size': minText + 'rpx' }"></view>
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
			<view class="box-item" @click="isTextFont">
				<text class="iconfont icon-text icon"></text>
				<view class="text">字体</view>
			</view>
			<view class="box-item" @click="moreColor">
				<text class="iconfont icon-all icon"></text>
				<view class="text">更多</view>
			</view>
		</view>

		<view class="fontBox" v-show="isFont">
			<view class="text">
				<text>字体:</text>
				<view class="porgree">
					<bestjhhMovableArea :min="0" :max="100" @change="change"></bestjhhMovableArea>
				</view>
			</view>
			<view class="lineHeight">
				<text>间距:</text>
				<view class="porgree">
					<bestjhhMovableArea :min="0" :max="99" @change="change"></bestjhhMovableArea>
				</view>
			</view>
		</view>

		<view class="colorBox" v-show="isColor">
			<view class="colorItem" @click="colorToggle(item.color, item.back)" v-for="(item, index) in colorList" :key="index">
				<view class="colorCart" :style="{ background: item.back }"></view>
				<text>{{ item.name }}</text>
			</view>
		</view>

		<popup v-if="isPopup" :content="readingList" @selectchapter="selectchapter" :select="select"></popup>
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
import bestjhhMovableArea from '@/components/bestjhh-movable-area/bestjhh-movable-area.vue';
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
	isFont.value = false;
	isColor.value = false;
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

//选择章节

const selectchapter = (id: string | number) => {
	select.value = readingList.value.content.findIndex((item) => item.id == id);
	isPopup.value = false;
};

//显示字体调整页面
const isFont = ref(false);
const isTextFont = () => {
	isShow.value = false;
	isFont.value = true;
};

//字体大小进度条
const minText = ref(30);
const minLine = ref(2);
const change = (score: number, str: string) => {
	if (str == 'text') {
		minText.value = score;
	} else {
		minLine.value = score;
	}
};

//切换颜色
const colorList = ref([
	{
		color: '#ffffffb3',
		name: '天蓝',
		back: '#1e90ff'
	},
	{
		color: '#2c2c54',
		name: '护眼',
		back: '#d1ccc0'
	},
	{
		color: '#ffffffb3',
		name: '淡灰',
		back: '#747d8c'
	},
	{
		color: '#2c2c54',
		name: '早晨',
		back: '#f8f9fa'
	},
	{
		color: '#c1cbcd',
		name: '夜间',
		back: '#4c5662'
	}
]);
const isColor = ref(false);

const moreColor = () => {
	isShow.value = false;
	isColor.value = true;
};

const colorToggle = (color: string, back: string) => {
	ToggleBackgrounds.value = back;
	ToggleColor.value = color;
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
			font-size: 30rpx;
			line-height: v-bind(minLine);
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
	.fontBox {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 200rpx;
		width: 100%;
		z-index: 999;
		background-color: v-bind(ToggleBackgrounds);
		box-sizing: border-box;
		padding: 30rpx;
		animation: identifier2 0.5s linear;
		.text {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			text {
				font-size: 40rpx;
				margin-right: 10rpx;
			}
			.porgree {
				flex: 1;
			}
		}
		.lineHeight {
			display: flex;
			align-items: center;
			text {
				font-size: 40rpx;
				margin-right: 10rpx;
			}
			.porgree {
				flex: 1;
			}
		}
	}
	.colorBox {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 200rpx;
		width: 100%;
		z-index: 999;
		background-color: v-bind(ToggleBackgrounds);
		box-sizing: border-box;
		padding: 0 30rpx;
		animation: identifier2 0.5s linear;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		color: v-bind(ToggleColor);
		.colorCart {
			width: 100rpx;
			height: 60rpx;
			border-radius: 5rpx;
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
