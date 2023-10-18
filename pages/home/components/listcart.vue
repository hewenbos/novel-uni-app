<template>
	<view class="main">
		<text class="title">{{ title }}</text>
		<view class="rightText">
			<text class="dose">{{ dose }}</text>
			<text class="iconfont icon-right"></text>
		</view>
	</view>
</template>

<script lang="ts" setup>
defineProps<{
	title: string;
	dose: string;
}>();
</script>

<style lang="scss">
.main {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 30rpx 0;
	.rightText {
		display: flex;
		align-items: center;
		.dose {
			color: #00000080;
			margin-right: 5rpx;
		}
		.icon-right {
			color: #00000080;
			margin-top: 2rpx;
		}
	}
	.title {
		font-size: 40rpx;
	}
}
</style>
