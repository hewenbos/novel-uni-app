<template>
	<view class="NavBar">
		<navigator open-type="navigateBack">
			<text class="iconfont icon-left"></text>
		</navigator>
		<text class="title">{{ title }}</text>
	</view>
</template>

<script lang="ts" setup>
defineProps<{
	title: string;
}>();
</script>

<style lang="scss">
.NavBar {
	height: 82rpx;
	padding: 0 10rpx;
	display: flex;
	align-items: center;
	.title {
		font-size: 30rpx;
	}
	.icon-left {
		margin-right: 20rpx;
		font-size: 30rpx;
	}
}
</style>
