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

		<view class="music-Box">
			<view class="music">
				<view class="progees">
					<text>{{ countTime || '00:00' }}</text>
					<view class="progee-box">
						<bestjhhMovableArea :min="0" :max="100" @change="change"></bestjhhMovableArea>
					</view>
					<text>{{ HaveTime || '00:00' }}</text>
				</view>

				<view class="music-info">
					<view class="music-dose" @click="goMusicInfo">
						<view class="music-name">歌手-{{ store.musicInfo.singer.name }}</view>
						<view class="music-Singer">歌曲-{{ store.musicInfo.name }}</view>
					</view>

					<view class="music-initiate">
						<!-- 上一首 -->
						<text class="iconfont icon-Previous icon" @click="Previous"></text>
						<!-- 开始和暂停 -->
						<text class="iconfont icon-Pause icon" :class="isPlay ? 'icon-Play' : 'icon-Pause'" @click="PauseAndPlay"></text>
						<!-- 下一首 -->
						<text class="iconfont icon-next icon" @click="next"></text>
						<text></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import NavBarSearch from '@/components/navBarSearch/index.vue';
import listCart from './components/listcart.vue';
import bookCart from './components/bookCart.vue';
import { getIndexDataApi, getMusicListApi } from '@/api/home';
import { onLoad } from '@dcloudio/uni-app';
import type { indexDataResponse } from '@/types/home';
import bestjhhMovableArea from '@/components/bestjhh-movable-area/bestjhh-movable-area.vue';
import { FiletimeMusic, HavePlayedTime } from '@/utils/TimeMusic';
import { ref } from 'vue';
import { useMusicStore } from '@/stores/music';

const store = useMusicStore();
onLoad(() => {
	getIndexData();
	getMusicList();
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

//获取音频

const getMusicList = async () => {
	const res = await getMusicListApi();
	store.musicList = res.data.musicResourecs;
	store.musicInfo = store.musicList[0];

	innerAudioContext.src = store.musicInfo.src;
};

//音频

const innerAudioContext = uni.createInnerAudioContext();

//播放和暂停
const isPlay = ref(false);

const countTime = ref('');
const HaveTime = ref('');

const PauseAndPlay = () => {
	isPlay.value = !isPlay.value;
	playInterval();
	if (isPlay.value) {
		innerAudioContext.play();
	} else {
		innerAudioContext.pause();
	}
};

const timer = ref(null);
const playInterval = () => {
	if (isPlay.value) {
		timer.value = setInterval(() => {
			if (isPlay.value) {
				if (innerAudioContext.duration > 0) {
					innerAudioContext.play();
					countTime.value = FiletimeMusic(innerAudioContext.duration);
					HaveTime.value = HavePlayedTime(innerAudioContext.currentTime);
				} else {
					clearInterval(timer.value);
					countTime.value = '00:00';
					innerAudioContext.pause();
					HaveTime.value = '00:00';
				}
			}
		}, 1000);
	} else {
		clearInterval(timer.value);
	}
};

//下一首
const next = async () => {
	store.nextMusic();
	isPlay.value = true;

	innerAudioContext.src = store.musicInfo.src;
	playInterval();
};

//上一首
const Previous = () => {
	store.PreviousMusic();
	isPlay.value = true;

	innerAudioContext.src = store.musicInfo.src;
	playInterval();
};

//拖拽

const change = (score: number) => {
	const value = score / 232;
	innerAudioContext.currentTime = innerAudioContext.duration * value;
};

//跳转到音乐详情页面
const goMusicInfo = () => {
	uni.navigateTo({
		url: `/subpck_home/musicInfo/index`
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
		margin-bottom: 160rpx;
		.books {
		}
	}

	.music-Box {
		position: fixed;
		left: 0;
		bottom: 110rpx;
		width: 100%;
		padding: 0 20rpx;
		height: 160rpx;
		box-sizing: border-box;
		.music {
			width: 100%;
			height: 160rpx;
			background-color: rgba(209, 204, 192, 0.9);
			border-radius: 10rpx;
			padding: 10rpx 0;
			box-sizing: border-box;
			.progees {
				display: flex;
				align-items: center;
				.progee-box {
					// width: 300rpx;
					flex: 1;
				}
				text {
					margin: 0 20rpx;
				}
			}
			.music-info {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;
				margin-top: 10rpx;
				font-size: 30rpx;
				color: #424651;
				.music-initiate {
					display: flex;
					align-items: center;
					width: 240rpx;
					justify-content: space-between;
					.icon {
						font-size: 70rpx;
						color: #424651;
					}
				}
			}
		}
	}
}
::v-deep uni-swiper {
	height: 380rpx;
}
</style>
