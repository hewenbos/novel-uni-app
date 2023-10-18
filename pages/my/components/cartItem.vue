<template>
	<view class="cartItem">
		<text>{{ title }}</text>
		<text class="iconfont icon-right"></text>
	</view>
</template>

<script setup lang="ts">
defineProps<{
	title: string;
}>();
</script>

<style lang="scss">
.cartItem {
	height: 90rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 36rpx;
	color: #00000080;
	padding: 0 20rpx;
	.icon-right {
		font-weight: 600;
	}
}
</style>
