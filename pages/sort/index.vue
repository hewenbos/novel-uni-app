<template>
	<navBarSearch></navBarSearch>
	<view class="main-box">
		<view class="left-main">
			<view class="left-item" :class="{ active: ids == item.id }" @click="offset(item.id)" v-for="item in list" :key="item.id">{{ item.title }}</view>
		</view>
		<view class="right-main" @scroll="scroll" ref="right">
			<view class="right-item" ref="indexcatch" :ids="item.id" v-for="item in list" :key="item.id">
				<view class="title">
					{{ item.title }}
				</view>

				<view class="itemList">
					<view class="item" v-for="(ele, index) in item.list" :key="index">{{ ele.name }}</view>
				</view>
			</view>

			<view class="right-items"></view>
			<view class="right-items"></view>
			<view class="right-items"></view>
			<view class="right-items"></view>
			<view class="right-items"></view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import navBarSearch from '@/components/navBarSearch/index.vue';
const list = ref([
	{
		title: '有声书',
		id: 1,
		list: [{ name: '言情' }, { name: '悬疑' }, { name: '都市' }, { name: '幻想' }, { name: '武侠' }, { name: '历史' }]
	},
	{
		title: '畅销书',
		id: 2,
		list: [{ name: '社科' }, { name: '经管' }, { name: '文学' }, { name: '励志' }, { name: '名著' }, { name: '生活' }]
	},
	{
		title: '儿童',
		id: 3,
		list: [{ name: '故事' }, { name: '儿童' }, { name: '动画' }, { name: '科普' }, { name: '名著' }, { name: '国学' }]
	},
	{
		title: '相声评书',
		id: 4,
		list: [{ name: '单田芳' }, { name: '郭德纲' }, { name: '热门相声' }, { name: '单口相声' }, { name: '名家评书' }, { name: '新锐笑将' }]
	},
	{
		title: '情感生活',
		id: 5,
		list: [{ name: '美味故事' }, { name: '伴你入眠' }, { name: '我要恋爱' }, { name: '两性婚姻' }, { name: '心灵探秘' }, { name: '情商修炼' }]
	},
	{
		title: '人文',
		id: 6,
		list: [{ name: '经典名著' }, { name: '佛学心灵' }, { name: '读书会' }, { name: '诗词歌赋' }, { name: '纪实档案' }, { name: '名家讲座' }]
	},
	{
		title: '历史',
		id: 7,
		list: [{ name: '百家讲坛' }, { name: '中国史' }, { name: '世界史' }, { name: '名人传' }, { name: '侃野史' }, { name: '春秋战国' }]
	},
	{
		title: '国学书院',
		id: 8,
		list: [{ name: '经典' }, { name: '百家讲坛' }, { name: '国史' }, { name: '诗文' }, { name: '诸子百家' }, { name: '佛道' }]
	},
	{
		title: '音乐',
		id: 9,
		list: [{ name: '纯音乐' }, { name: '老歌' }, { name: '翻唱' }, { name: '影视' }, { name: '欧美' }, { name: '古风' }]
	},
	{
		title: '英语',
		id: 10,
		list: [{ name: '口语' }, { name: '教材' }, { name: '考试' }, { name: '少儿' }, { name: '词汇' }, { name: '职场' }]
	}
]);

const indexcatch = ref();
const ids = ref();
const scrollHeight = ref(160);
const offset = (id: number) => {
	ids.value = id - 1;
	const num = id - 1;
	right.value.$el.scrollTop = scrollHeight.value * num;
};
const right = ref();
const scroll = () => {
	let scrollTop = right.value.$el.scrollTop;
	for (let i = 0; i < indexcatch.value.length; i++) {
		//判断滚到哪个块就让哪个块对应的索引左侧的同步滑动
		if (indexcatch.value[i].$el.offsetTop - scrollTop <= 80) {
			ids.value = i + 1;
		}
	}
};
</script>

<style lang="scss">
.main-box {
	height: calc(100vh - 91px);
	display: flex;
	background-color: #f0f3f8;
	.left-main {
		width: 200rpx;
		height: 100%;
		overflow-y: scroll;

		text-align: center;
		.left-item {
			height: 150rpx;
			line-height: 150rpx;
			color: rgba(0, 0, 0, 0.5);
		}
		.left-item.active {
			font-weight: 600;
			color: #f00;
		}
	}
	.right-main {
		flex: 1;
		height: 100%;
		overflow-y: scroll;
		transition: all 1s linear;
		.right-item {
			margin-top: 10rpx;
			margin-bottom: 100rpx;
			.title {
				font-size: 40rpx;
				text-align: center;
				margin-bottom: 10rpx;
			}
			.itemList {
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				border-radius: 10rpx;
				.item {
					flex: 33%;
					height: 83rpx;
					text-align: center;
					line-height: 83rpx;
				}
			}
		}

		.right-items {
			height: 200rpx;
		}
	}
}
</style>
