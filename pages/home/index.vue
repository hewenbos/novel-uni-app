<template>
	<NavBarSearch></NavBarSearch>
	<view class="home app-main" v-if="IndexData">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in IndexData.swiperImages" :key="index">
				<image class="swiperImg" :src="item.src" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>

		<view class="navlist">
			<view class="navItem" @click="router('榜单')">
				<text class="iconfont icon-trophy icon"></text>
				<view class="text">看榜单</view>
			</view>
			<view class="navItem" @click="router('小说')">
				<text class="iconfont icon-book icon"></text>
				<view class="text">听小说</view>
			</view>
			<view class="navItem" @click="router('音乐')">
				<text class="iconfont icon-reception icon"></text>
				<view class="text">听音乐</view>
			</view>
			<view class="navItem" @click="router('知识')">
				<text class="iconfont icon-knowledge icon"></text>
				<view class="text">听知识</view>
			</view>
		</view>

		<!-- 喜欢 -->
		<view class="like">
			<listCart title="猜你喜欢" dose="更多推荐"></listCart>
			<view class="likeList">
				<view class="likeItem" v-for="(item, index) in IndexData.Rebooks" :key="index">
					<image class="bookImg" :src="item.src" mode="aspectFit"></image>
					<view class="bookName">{{ item.name }}</view>
				</view>
			</view>
		</view>

		<!-- 分类数据 -->

		<view class="classification" v-for="(item, index) in IndexData.bookResources" :key="index">
			<listCart :title="item.headerTitle" dose="查看全部"></listCart>
			<view class="books">
				<bookCart v-for="(ele, idx) in item.books" :key="idx" :ele="ele"></bookCart>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import NavBarSearch from '@/components/navBarSearch/index.vue';
import listCart from './components/listcart.vue';
import bookCart from './components/bookCart.vue';
import { getIndexDataApi } from '@/api/home';
import { onLoad } from '@dcloudio/uni-app';
import type { indexDataResponse } from '@/types/home';
import { ref } from 'vue';
onLoad(() => {
	getIndexData();
});

//调用首页接口
const IndexData = ref<indexDataResponse>();
const getIndexData = async () => {
	const reslut = await getIndexDataApi();

	IndexData.value = reslut.data;
	console.log(IndexData.value);
};

//跳页面
const router = (text: string) => {
	uni.navigateTo({
		url: '/subpck_home/info/index?content=' + text
	});
};
</script>

<style lang="scss">
.home {
	overflow: scroll;
	height: calc(100vh - 100px);
	.swiperImg {
		width: 100%;
		height: 100%;
	}
	::v-deep .uni-swiper-dot-active {
		background-color: #ffffff;
	}

	.navlist {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 40rpx 0;
		.navItem {
			text-align: center;
			.text {
				color: #00000080;
				font-size: 30rpx;
				margin-top: 10rpx;
			}
			.icon {
				font-size: 64rpx;
			}
		}
	}
	.like {
		.likeList {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;
			.likeItem {
				text-align: center;
				color: #00000080;
				.bookImg {
					width: 230rpx;
					height: 240rpx;
				}
			}
		}
	}

	.classification {
		margin: 20rpx 0;
		.books {
		}
	}
}
::v-deep uni-swiper {
	height: 380rpx;
}
</style>
