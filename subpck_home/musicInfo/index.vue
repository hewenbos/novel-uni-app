<template>
	<NavBarRouter title="音乐详情" :style="{ backgroundColor: musicColor }"></NavBarRouter>
	<view class="music">
		<view class="header">
			<view class="music-name">
				歌曲:
				<text>{{ store.musicInfo.name }}</text>
			</view>
			<view class="music-name">
				歌手:
				<text>{{ store.musicInfo.singer.name }}</text>
			</view>

			<image class="musicImg" :src="store.musicInfo.cover" mode="scaleToFill"></image>
		</view>

		<view class="progees">
			<text>{{ countTime || '00:00' }}</text>
			<view class="progee-box">
				<bestjhhMovableArea :min="0" :max="100" @change="change"></bestjhhMovableArea>
			</view>
			<text>{{ HaveTime || '00:00' }}</text>
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

		<view class="music-initiate">
			<view class="item" @click="toggleList">
				<text class="iconfont icon-list icons" :class="{ active: isTwo }"></text>
				<view class="icontext">播放列表</view>
			</view>
			<view class="item" @click="collect">
				<text class="iconfont icon-love icons" :class="{ select: iscollect }"></text>
				<view class="icontext">{{ iscollect ? '取消收藏' : '收藏' }}</view>
			</view>
			<view class="item" @click="toggleStore.toogleMusicColor">
				<text class="iconfont icon-night icons"></text>
				<view class="icontext">夜间模式</view>
			</view>
		</view>

		<view class="footerBox" v-if="isOne">
			<view class="footerHeader">
				<view class="name">
					<view class="music-name">
						歌曲:
						<text>{{ store.musicInfo.name }}</text>
					</view>
					<view class="music-name">
						歌手:
						<text>{{ store.musicInfo.singer.name }}</text>
					</view>
				</view>
				<text class="iconfont icon-zuoy" @click="showPopUp"></text>
			</view>

			<view class="intro">
				<view class="singerintro">歌手简介:</view>
				<view class="singer">{{ store.musicInfo.singer.synopsis }}</view>
			</view>
		</view>

		<view class="footerBox" v-if="isTwo">
			<view class="musicList">
				<view class="musicItem" @click="playMusic(item)" v-for="item in store.musicList" :key="item.id">
					<view class="singer">{{ item.singer.name }}</view>
					<view class="musicname">{{ item.name }}</view>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="center">
			<view class="content">
				{{ store.musicInfo.singer.synopsis }}
			</view>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
import NavBarRouter from '@/components/navBarRouter/index.vue';
import bestjhhMovableArea from '@/components/bestjhh-movable-area/bestjhh-movable-area.vue';
import { ref } from 'vue';
import { useMusicStore } from '@/stores/music';
import { useToggleStore } from '@/stores/Toggle';
import { onLoad } from '@dcloudio/uni-app';
import { storeToRefs } from 'pinia';
import { FiletimeMusic, HavePlayedTime } from '@/utils/TimeMusic';
import type { musicResourecs } from '@/types/home';
const store = useMusicStore();
const toggleStore = useToggleStore();
const { musicColor } = storeToRefs(useToggleStore());
const isOne = ref(false);
const isTwo = ref(false);
onLoad(() => {
	isOne.value = true;
	innerAudioContext.src = store.musicInfo.src;

	iscollect.value = store.collectMusic.some((item) => item.id == store.musicInfo.id);
});

//切换列表
const toggleList = () => {
	isTwo.value = !isTwo.value;
	if (isTwo.value) {
		isOne.value = false;
	} else {
		isOne.value = true;
	}
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

//点击播放音乐
const playMusic = (item: musicResourecs) => {
	store.musicInfo = item;
	innerAudioContext.src = store.musicInfo.src;
	isPlay.value = true;
	playInterval();
};

//点击收藏
const iscollect = ref(false);
const collect = () => {
	const index = store.collectMusic.findIndex((item) => item.id == store.musicInfo.id);
	if (index != -1) {
		store.collectMusic.splice(index, 1);
		iscollect.value = false;
	} else {
		store.collectMusic.push(store.musicInfo);
		iscollect.value = true;
	}
};

//显示弹框
const popup = ref();
const showPopUp = () => {
	popup.value.open();
};
</script>

<style lang="scss">
.music {
	position: relative;
	height: calc(100vh - 41px);
	background-color: v-bind(musicColor);
}
.header {
	text-align: center;
	.music-name {
		font-size: 30rpx;
		padding: 10rpx 0;
		text {
			font-weight: 600;
			font-size: 40rpx;
		}
	}

	.musicImg {
		width: 600rpx;
		height: 380rpx;
		border-radius: 10rpx;
		box-shadow: 10rpx 10rpx 30rpx #ccc;
	}
}

.progees {
	display: flex;
	align-items: center;
	margin-top: 10rpx;
	.progee-box {
		// width: 300rpx;
		flex: 1;
	}
	text {
		margin: 0 20rpx;
		color: rgb(122, 131, 136);
	}
}

.music-initiate {
	display: flex;
	align-items: center;
	margin-top: 30rpx;
	text-align: center;
	justify-content: center;
	.icon {
		font-size: 120rpx;
		color: #424651;
		margin: 0 15rpx;
	}
	.item {
		text-align: center;
		margin: 0 15rpx;
		color: #343a40;
		.icons {
			font-size: 60rpx;
			color: #343a40;
		}

		.icon-list.active {
			font-weight: 600;
		}

		.icon-love.select {
			color: #f60;
		}
		.icontext {
			margin-top: 10rpx;
		}
	}
}

.footerBox {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 300rpx;
	border-radius: 30rpx 30rpx 0rpx 0rpx;
	box-shadow: 0 0 10rpx #ccc;
	animation: footerBox 0.5s linear;
	padding: 20rpx;
	box-sizing: border-box;
	.footerHeader {
		display: flex;
		align-items: center;
		justify-content: space-between;
		text {
			font-weight: 600;
		}
		.icon-zuoy {
			color: #343a40;
		}
	}

	.intro {
		margin-top: 40rpx;
		.singer {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			font-weight: 600;
			font-size: 40rpx;
		}
	}

	.musicList {
		height: 100%;
		overflow-y: scroll;
		.musicItem {
			display: flex;
			align-items: center;

			padding: 10rpx 0;
			.singer {
				width: 200rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.musicname {
				flex: 1;
				margin-left: 20rpx;
				text-align: left;
			}
		}
	}
}
.content {
	width: 80%;
	height: 800rpx;
	background-color: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	box-sizing: border-box;
	margin: 0 auto;
}
@keyframes footerBox {
	0% {
		margin-bottom: -300rpx;
	}
	100% {
		margin-bottom: 0;
	}
}
</style>
