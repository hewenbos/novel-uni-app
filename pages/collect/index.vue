<template>
	<navBarSearch></navBarSearch>
	<view class="collect">
		<view class="tabs">
			<view class="tabsItem" @click="active = 0">
				<text class="utext" :class="{ active: active == 0 }">我的收藏</text>
			</view>
			<view class="tabsItem" @click="active = 1">
				<text class="utext" :class="{ active: active == 1 }">收听历史</text>
			</view>
		</view>

		<view class="content" v-if="active == 0">
			<view class="contentitem" v-for="(item, index) in store.collectList" :key="index">
				<image class="collectImg" :src="item.imgurl" mode=""></image>
				<view class="dose">
					<view class="bookname">{{ item.name }}</view>
					<view class="bookdose">
						{{ item.synopsis }}
					</view>
					<view class="icon">
						<text class="iconfont icon-more" @click="cancelCollect(item.id, 'book')"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="content" v-if="active == 1">
			<view class="contentitem" v-for="(item, index) in musicStore.collectMusic" :key="index">
				<image class="collectImg" :src="item.cover" mode=""></image>
				<view class="dose">
					<view class="bookname">{{ item.name }}</view>
					<view class="bookdose">
						{{ item.singer.synopsis }}
					</view>
					<view class="icon">
						<text class="iconfont icon-more" @click="cancelCollect(item.id, 'music')"></text>
					</view>
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="main">
				<view class="top" @click="collectDel">
					<text class="iconfont icon-xing"></text>
					<text>取消收藏</text>
				</view>
				<view class="cell"></view>
				<view class="cancel" @click="cancel">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
import navBarSearch from '@/components/navBarSearch/index.vue';
import { useCollectStore } from '@/stores/collect';
import { useMusicStore } from '@/stores/music';
import { ref } from 'vue';
const store = useCollectStore();

const musicStore = useMusicStore();
const active = ref(0);

const popup = ref();
//取消收藏
const idCollect = ref();
const types = ref('');
const cancelCollect = (id: string | number, type: string) => {
	popup.value.open();
	idCollect.value = id;
	types.value = type;
};

//
const cancel = () => {
	popup.value.close();
};

const collectDel = () => {
	if (types.value == 'book') {
		store.collectList = store.collectList.filter((item) => item.id !== idCollect.value);
	} else {
		musicStore.collectMusic = musicStore.collectMusic.filter((item) => item.id !== idCollect.value);
	}

	popup.value.close();
};
</script>

<style lang="scss">
.collect {
	.tabs {
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #00000080;
		font-size: 39rpx;
		margin-bottom: 40rpx;
	}
	.tabsItem {
		position: relative;
	}

	.utext.active {
		font-weight: 700;
		animation: identifier 0.5s linear;
	}
	.active::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -20rpx;
		height: 8rpx;
		width: 100%;
		background-color: #f60;
		border-radius: 8rpx;
		animation: identifier 0.5s linear;
	}
	.content {
		padding: 0 30rpx;
		.contentitem {
			display: flex;
			margin: 10rpx 0;
			justify-content: space-between;
			.collectImg {
				width: 220rpx;
				height: 220rpx;
				margin-right: 10rpx;
			}
			.dose {
				flex: 1;
				.bookdose {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					line-clamp: 3;
					-webkit-line-clamp: 3;
					overflow: hidden;
					color: #00000080;
				}

				.bookname {
					font-weight: 600;
					margin-bottom: 10rpx;
				}

				.icon {
					text-align: right;
					.icon-more {
						font-size: 40rpx;
					}
				}
			}
		}
	}

	.main {
		width: 100%;
		height: 300rpx;
		background-color: #fff;

		.top {
			display: flex;
			padding: 20rpx 40rpx;
			align-items: center;
			font-size: 40rpx;
			margin-bottom: 10rpx;
			.icon-xing {
				font-size: 40rpx;
				color: #f60;
				margin-right: 10rpx;
			}
		}
		.cell {
			height: 14rpx;
			background-color: #dae0e5;
		}
		.cancel {
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
	@keyframes identifier {
		0% {
			scale: 0.5;
		}
		50% {
			scale: 1.2;
		}
		100% {
			scale: 1;
		}
	}
}
</style>
