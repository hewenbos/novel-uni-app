<template>
	<view class="popup">
		<view class="chapterTitle">章节选择</view>
		<view class="chapterList">
			<view class="chapterItem" :class="{ select: select == index }" @click="selectchapter(item.id)" v-for="(item, index) in content.content" :key="item.id">
				{{ item.chapter }}
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import type { readingResponse } from '@/types/reading';
defineProps<{
	content: readingResponse;
	select: string | number;
}>();

const emits = defineEmits<{
	(e: 'selectchapter', value: string | number);
}>();

//选择章节
const selectchapter = (id: string | number) => {
	emits('selectchapter', id);
};
</script>

<style lang="scss">
.popup {
	width: 450rpx;
	box-sizing: border-box;
	padding: 0 20rpx;
	height: 100%;
	background-color: #fff;
	position: absolute;
	left: 0;
	top: 0;
	animation: popup 0.5s linear;
	.chapterTitle {
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 39rpx;
	}
	.chapterList {
		height: calc(100vh - 80rpx);
		overflow-y: scroll;
		.chapterItem {
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			height: 80rpx;
			line-height: 80rpx;
		}
		.chapterItem.select {
			background-color: #8395a7;
			color: #fff;
		}
	}
}
@keyframes popup {
	0% {
		margin-left: -400rpx;
	}
	100% {
		margin-left: 0;
	}
}
</style>
