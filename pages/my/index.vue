<template>
	<view class="my-app">
		<view class="header">
			<view class="userBox">
				<image class="userImg" src="@/static/images/user.jpg" mode="scaleToFill"></image>
				<text class="userName">麦3</text>
			</view>
			<view class="Customer">
				<text class="iconfont icon-customer"></text>
				<text>我的客服</text>
			</view>
		</view>
		<view class="cartList">
			<CartItem title="签到"></CartItem>
			<view class="Partingline"></view>
			<CartItem title="设置"></CartItem>
			<view class="Partingline"></view>
			<CartItem title="意见反馈"></CartItem>
			<view class="Partingline"></view>
			<CartItem title="切换账号"></CartItem>
			<view class="Partingline"></view>
		</view>
	</view>
</template>

<script setup lang="ts">
import CartItem from './components/cartItem.vue';
</script>

<style lang="scss">
.my-app {
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 200rpx;
		padding: 0 20rpx;
		.userBox {
			display: flex;
			align-items: center;
			.userImg {
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
				margin-right: 10rpx;
			}
			.userName {
				font-size: 36rpx;
				color: #000000;
			}
		}
		.Customer {
			width: 190rpx;
			height: 60rpx;
			background-color: #ecf0f3;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-radius: 60rpx;
			padding: 0 20rpx;
			font-size: 30rpx;
			.icon-customer {
				font-weight: 600;
			}
		}
	}
	.cartList {
		.Partingline {
			height: 12rpx;
			background-color: #f8f8f8;
		}
	}
}
</style>
