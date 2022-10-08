<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="130" class="my-swpie" :show-indicators="false">
                <van-swipe-item v-for="item in state.musicList" :key="item">
                        <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
                    <img :src="item.picUrl" alt=""/>
                    <span class="playCount">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-24gl-play"></use>
                        </svg>
                        <!-- 播放量 -->
                        {{changeCount(item.playCount)}}     
                    </span>
                    <span class="name">{{item.name}}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import {getMusicList} from "@/request/api/home.js";
import { reactive, onMounted } from "vue";
// export default {
//     data(){
//         return{
//             musicList:[],
//         };
//     },
//     methods:{
//         async getGnedan(){
//             let res = await getMusicList();
//             console.log(res);
//             this.musicList = res.data.result    // 将后台数据赋值
//         },
//         // 播放量处理
//         changeCount: function(num){
//             if(num>=100000000){
//                 return (num/100000000).toFixed(1)+"亿"
//             }else if(num>=10000){
//                 return (num/10000).toFixed(1)+"万"
//             }
//         }
//     },
//     mounted(){
//         this.getGnedan()
//     }
// };

// // Vue3
export default {
setup() {
    const state = reactive({
        musicList: [],
    });
    function changeCount(num) {
        if (num >= 100000000) {
            return (num / 100000000).toFixed(1) + "亿";
        } else if (num >= 10000) {
            return (num / 10000).toFixed(1) + "万";
        }
    }
    onMounted(async () => {
        let res = await getMusicList();
        console.log(res);
        state.musicList = res.data.result;
    });
    return { state,changeCount };
    },
};

</script>

<style lang="less" scoped>
    .musicList {
        width: 100%;
        height:5rem;
        padding:.2rem;
    }

    .musicList .musicTop {
        width:100%;
        height:.6rem;
        display:flex;
        justify-content:space-between;
        margin-bottom:.2rem;
    }

    .musicList .title{
        font-size:.4rem;
        font-weight:900;
    }
    .musicList .more{
        border:1px solid #ccc;
        text-align:center;
        line-height:.6rem;
        padding:0 0.2rem;
        border-radius:.4rem;
    }

    .musicList .musicontent{
        width:100%;
        height: 3.6rem;
    }
    
    .musicList .van-swipe-item{
        padding-right: 0.2rem;
        position: relative;
        height: 3.8rem;
    }
    .musicList .van-swipe-item img{
        width:100%;
        height: 2.4rem;
        border-radius: 0.2rem;
    }
    .musicList .van-swipe-item .playCount{
        position: absolute;
        z-index: 100;
        right: 0.3rem;
        color: white;
        margin-top: 0.06rem;
    }
    .musicList .playCount .icon{
        width: 0.3rem;
        height: 0.3rem;
    }
    .musicList .van-swipe-item .name{
        bottom: 0px;
    }
</style>