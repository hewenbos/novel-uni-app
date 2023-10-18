<template>
	<view class="searchBox">
		<input class="search" type="text" placeholder="请输入您想听的节目" value="" />
		<text class="iconfont icon-search"></text>
	</view>
</template>

<script></script>

<style lang="scss">
.searchBox {
	height: 82rpx;
	padding: 0 20rpx;
	display: flex;
	align-items: center;
	position: relative;
	.search {
		flex: 1;
		background-color: #f8f9fa;
		height: 61rpx;
		border-radius: 10rpx;
		border: 2rpx solid #dee2e6;
		box-sizing: border-box;
		padding-left: 50rpx;
		font-size: 24rpx;
	}
	.uni-input-placeholder {
		color: #dee2e6;
	}
	.icon-search {
		left: 28rpx;
		top: 25rpx;
		position: absolute;
		color: #dee2e6;
	}
}
</style>
