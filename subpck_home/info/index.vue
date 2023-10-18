<template>
	<view class="main">
		<view class="header">
			<navigator open-type="navigateBack">
				<text class="iconfont icon-left"></text>
			</navigator>
			<text>{{ title }}</text>
		</view>
		<view class="scroll">
			<scroll-view scroll-y="true" @scrolltolower="scrolltolower">
				<view>
					<bookCart v-for="item in bookList" :key="item.id" :ele="item"></bookCart>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { getBookInfoListApi } from '@/api/info';
import type { books } from '@/types/info';
import bookCart from '@/pages/home/components/bookCart.vue';
import { ref } from 'vue';
const title = ref('');
onLoad((e: { content: string }) => {
	title.value = e.content;
	getBookInfoList();
});

const bookList = ref<books[]>([]);
const getBookInfoList = async () => {
	const res = await getBookInfoListApi();
	bookList.value = [...bookList.value, ...res.data.books];
};

//上拉加载
const scrolltolower = () => {
	console.log(11);

	getBookInfoList();
};
</script>

<style lang="scss">
.header {
	height: 60rpx;
	width: 100%;
	background-color: #fff;
	display: flex;
	align-items: center;
	.icon-left {
		margin-right: 20rpx;
	}
}

.scroll {
	height: calc(100vh - 30px);
	overflow-y: scroll;
	::v-deep uni-scroll-view {
		height: 100%;
	}
}
</style>
