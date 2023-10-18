<template>
	<view class="bookCart" @click="getBookInfo(ele.id)">
		<image class="bookCartImg" :src="ele.imgurl" mode=""></image>
		<view class="booksDose">
			<view class="bookTitle">{{ ele.name }}</view>
			<view class="bookDetail">{{ ele.synopsis }}</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import type { booksList } from '@/types/home';
defineProps<{
	ele: booksList;
}>();

//跳转到图书详情
const getBookInfo = (id: string | number) => {
	uni.navigateTo({
		url: `/subpck_home/detail/index?bookId=${id}`
	});
};
</script>

<style lang="scss">
.bookCart {
	padding: 10rpx 0;
	display: flex;
	.bookCartImg {
		width: 250rpx;
		height: 250rpx;
		border-radius: 10rpx;
		margin-right: 18rpx;
	}
	.booksDose {
		flex: 1;
		.bookTitle {
			font-weight: 700;
			font-size: 34rpx;
			margin-bottom: 10rpx;
		}
		.bookDetail {
			font-size: 30rpx;
			color: #00000080;
		}
	}
}
</style>
