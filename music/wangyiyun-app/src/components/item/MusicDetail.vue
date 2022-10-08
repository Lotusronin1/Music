<!-- 弹出层内容 -->
<template>
    <img :src="musicList.al.picUrl" class="bgimg"/>
    <!-- 顶部内容 -->
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon" aria-hidden="true" @click="backHome">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <div class="leftMarquee">
                <!-- 跑马灯进行安装 npm install vue3-marquee@latest --save -->
                <Vue3Marquee style="color:#fff">
                    {{musicList.al.name}}
                </Vue3Marquee>
                <span v-for="item in musicList.ar" :key="item">
                    {{item.name}}
                </span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
        </div>
        <div class="detailTopRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <!-- 中间指针磁盘内容 -->
    <div class="detailContent" v-show="!isLyricShow">
        <img src="@/assets/needle-ab.png" class="img_needle" :class="{img_needle_active:!isbtnShow}"/>
        <img src="@/assets/cd.png" class="img_cd"/>
        <img :src="musicList.al.picUrl" class="img_ar"  @click="isLyricShow=true" :class="{img_ar_active:!isbtnShow,img_ar_pauesd:isbtnShow}"/>
    </div>
    <!-- 中间歌词 -->
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
        <p v-for="item in lyric" :key="item" :class="{active:(currentTime*1000>=item.time && currentTime*1000<item.pre)}">
        {{item.lrc}}
        </p>
    </div>
    <!-- 底部内容 -->
    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>

            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
            </svg>

            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-music"></use>
            </svg>

            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi"></use>
            </svg>

            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon"></use>
            </svg>
        </div>
        <!-- 进度条 -->
        <div class="footerContent">
            <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
        </div>
        <div class="footer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-ziyuanldpi"></use>
            </svg>
            <!-- 切换上一首按钮 -->
            <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyishou"></use>
            </svg>
            <!-- 播放按钮 -->
            <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
                <use xlink:href="#icon-zanting_"></use>
            </svg>
            <!-- 暂停按钮 -->
            <svg class="icon" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-tubiaozhizuomoban"></use>
            </svg>
            <!-- 切换下一首按钮 -->
            <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-xiayishou"></use>
            </svg>

            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gf-playlistMusic2"></use>
            </svg>
        </div>
    </div>
</template>
<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations,mapState } from 'vuex'

export default {
    data(){
        return {
            isLyricShow:false
        }
    },
    computed:{
        ...mapState(["lyricList","currentTime","playListIndex","playList","duration"]),
        lyric:function(){
            let arr;
            if(this.lyricList.lyric){
                // 对歌词进行切割
                arr=this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                    let min=item.slice(1,3);
                    let sec=item.slice(4,6);
                    let mill=item.slice(7,10);
                    let lrc=item.slice(11,item.length);
                    let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);    // 获取总毫秒数
                    if(isNaN(Number(mill))){
                        mill=item.slice(7,9);
                        lrc=item.slice(10,item.length);
                        time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);
                    }
                    // console.log(min,sec,Number(mill),lrc);
                    return {min,sec,mill,lrc,time};
                })
                arr.forEach((item,i)=>{
                    if(i===arr.length-1 || isNaN(arr[i+1].time)){
                        item.pre=100000;
                    }else{
                        item.pre=arr[i+1].time;   // 下一句歌词的时间
                    }
                });
            }
            // console.log(arr);
            return arr;
        }
    },
    mounted(){
        // console.log(this.musicList);
        // console.log(this.lyricList.lyric);
        this.addDuration()
    },
    props:['musicList','isbtnShow','play','addDuration'],
    methods:{
        backHome:function(){
            this.isLyricShow=false;
            this.updateDetailShow();
        },
        // 歌曲切换功能
        goPlay:function(num){
            let index=this.playListIndex+num
            if(index<0){
                index=this.playList.length-1
            }else if(index==this.playList.length){
                index=0
            }
            this.updatePlayListIndex(index);
        },
        ...mapMutations(['updateDetailShow','updatePlayListIndex'])
    },
    watch:{
        currentTime:function(newValue){
            let p = document.querySelector("p.active");
            // console.log([p]);
            if(p){
                if(p.offsetTop>300){
                    this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
            }
            }
            if(newValue===this.duration){
                // 如果到达了最后一首，就让它回到第一首
                if(this.playListIndex===this.playListIndex+1){
                    this.updatePlayListIndex(0);
                    this.play()
                }else{
                    this.updatePlayListIndex(this.playListIndex+1);
                }
            }
        }
    },
    components:{
        Vue3Marquee,
    }
}
</script>
<style scoped>
.bgimg{
    width:100%;
    height:100%;
    position:absolute;
    z-index:-1;
    filter:blur(70px);
}
.detailTop{
    width:100%;
    height:1rem;
    display:flex;
    padding:.2rem;
    justify-content:space-between;
    align-items:center;
    fill:#fff;
}
.detailTop .detailTopLeft{
    display:flex;
    align-items:center;
}
.detailTop .detailTopLeft .leftMarquee{
    width:3rem;
    height:100%;
    margin-left:.4rem;

}
.detailTop .leftMarquee span{
    color:black;
}
.detailTop .leftMarquee .icon{
    width:.3rem;
    height:.3rem;
    fill:#999;
}
.detailContent{
    width:100%;
    height:9rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
}
.detailContent .img_needle{
    width:2rem;
    height:3rem;
    position:absolute;
    left:46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
}
.detailContent .img_needle_active{
    width:2rem;
    height:3rem;
    position:absolute;
    left:46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
}

.detailContent .img_cd{
    width:5rem;
    height:5rem;
    position:absolute;
    bottom: 2.3rem;
    z-index:-1;
}
.detailContent .img_ar{
    width:3.2rem;
    height:3.2rem;
    border-radius:50%;
    position:absolute;
    bottom:3.14rem;
    animation:rotate_ar 10s linear infinite;   /*将动画添加到图片上 linear:匀速  infinite:无限循环*/
}

/* 磁盘动画 */
@keyframes rotate_ar{
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}

/* 启动动画 */
.detailContent .img_ar_active {
    animation-play-state: running;
}
/* 停止动画 */
.detailContent .img_ar_pauesd {
    animation-play-state: paused;
}

/* 歌词部分 */
.musicLyric {
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;     /*垂直排列*/
    align-items: center;
    margin-top: 0.2rem;
    overflow: scroll;
}
.musicLyric p{
    color: rgb(190, 181, 181);
    margin-bottom: 0.3rem;
}
.musicLyric .active{
    color: #fff;
    font-size: 0.4rem;
}

/* 底部样式 */
.detailFooter {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.detailFooter .footerTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.detailFooter .footerTop .icon{
    width: 0.36rem;
    height: 0.36rem;
    fill: rgb(245, 234, 234);
}
.detailFooter .footerTop .icon{
    width: 0.6rem;
    height: 0.6rem;
}
.footerContent .range {
    width: 100%;
    height: 0.06rem;
}
.detailFooter .footer{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.detailFooter .footer .icon{
    fill: rgb(245, 234, 234);
}
.detailFooter .footer .bofang{
    width: 1rem;
    height: 1rem;
}
</style>
