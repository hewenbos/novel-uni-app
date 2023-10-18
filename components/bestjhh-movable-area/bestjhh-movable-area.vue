<template>
	<view>
		<view class="slider-box">
			<view class="flex"></view>
			<movable-area class="sliderBar" :style="{ width: 100 - minScore + '%' }">
				<view class="gone" :style="{ width: x + 'px' }"></view>
				<movable-view class="slider" :x="x" :y="y" direction="all" @change="onChange"></movable-view>
			</movable-area>
			<view :style="{ width: 100 - maxScore + '%' }"></view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

const { min, max } = defineProps<{
	min: number;
	max: number;
}>();

const emit = defineEmits<{
	(e: 'change', value: number | string, text: string);
}>();

const slideBarWidth = ref(0);
const minScore = ref(min ? min : 0);
const maxScore = ref(max ? max : 100);
const x = ref(0);
const y = ref(0);
const score = ref(min ? min : 0);

nextTick(() => {
	uni.createSelectorQuery()
		.select('.slider-box')
		.boundingClientRect(function (res: any) {
			slideBarWidth.value = res.width;
		})
		.exec();
});

const onChange = (e: any) => {
	x.value = e.detail.x;

	// score.value = Math.floor((e.detail.x / slideBarWidth.value) * 100) + minScore.value;
	score.value = Math.floor(e.detail.x);

	if (max == 100) {
		emit('change', score.value, 'text');
	} else {
		emit('change', score.value, 'line');
	}
};
</script>

<style lang="scss">
$uni-color-primary: #f63d59;
.slider-box {
	display: flex;
	width: 100%;
	height: 32rpx;
	position: relative;
	&::before {
		content: '';
		position: absolute;
		height: 8rpx;
		border-radius: 8rpx;
		background-color: #eeeeee;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 100%;
	}
	.flex {
		flex: 1;
		height: 8rpx;
		border-radius: 8rpx 0 0 8rpx;
		background-color: $uni-color-primary;
		margin-top: 12rpx;
		position: relative;
		z-index: 1;
	}

	.sliderBar {
		height: 100%;
		border-radius: 8rpx;
		width: 100%;
		.gone {
			background-color: $uni-color-primary;
			height: 100%;
			position: absolute;
			left: 0;
			height: 8rpx;
			top: 12rpx;
			max-width: 100%;
			z-index: 1;
			border-radius: 0 8rpx 8rpx 0;
		}
		.slider {
			width: 0;
			height: 100%;
			position: relative;
			z-index: 2;
			&::after {
				content: '';
				position: absolute;
				border-radius: 16rpx;
				background-color: $uni-color-primary;
				width: 32rpx;
				height: 100%;
				transform: translatex(-50%);
			}
			text {
				position: absolute;
				width: 60rpx;
				color: white;
				border-radius: 14rpx;
				top: -140%;
				left: 50%;
				text-align: center;
				transform: translateX(-50%);
				background-color: $uni-color-primary;
				&::after {
					content: '';
					position: absolute;
					border: 6rpx solid transparent;
					border-top-color: $uni-color-primary;
					top: 99%;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
	}
}
</style>
