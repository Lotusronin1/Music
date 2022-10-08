<template>
    <!-- 引入轮播图组件 -->
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
        </van-swipe-item>
    </van-swipe>
    </div>
</template>

<script>
import axios from 'axios'
import {getBanner} from '@/request/api/home.js'
import {reactive,onMounted} from 'vue'
export default {
    setup() {
    const state = reactive({    // 响应式
        images:[
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]});
    onMounted(async ()=>{
        let res = await getBanner();
        state.images = res.data.banners 
    })
    return { state };
    },
};
</script>

<style lang="less">
// 轮播图样式 
#swiperTop{
    .van-swipe{
        width:100%;
        height:3rem;
        .van-swipe-item{
            padding:0 0.2rem;
            img{
                width:100%;
                height:100%;
                border-radius:0.2rem;
            }
        }
        .van-swipe_indicator--active{   // 按钮样式
            background-color:rgb(219,130,130);
        }
    }
}
</style>