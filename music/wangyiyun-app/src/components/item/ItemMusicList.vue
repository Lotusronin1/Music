<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <!-- 左边播放全部 -->
            <div class="listLeft">
                <!-- 播放按钮 -->
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gf-playCircle"></use>
                </svg>
                <span>播放全部<span>(共{{itemList.length}}首)</span></span>
            </div>
            <!-- 右边收藏 -->
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏{{subscribedCount}}</span>
            </div>
        </div>

        <div class="itemList">
            <div class="item" v-for="(item,i) in itemList" :key="i">
                <!-- 列表左边序号，歌名和歌手 -->
                <div class="itemLeft" @click="playMusic(i)">
                    <span class="leftSpan">{{i+1}}</span>
                    <div>
                        <p>{{item.name}}</p>
                        <span v-for="(item1,index) in item.ar" :key="index">
                        {{item1.name}}
                        </span>
                    </div>
                </div>
                <!-- 列表右边图标 -->
                <div class="itemRight">
                    <svg class="icon bofang" aria-hidden="true" v-if="item.mv !=0">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-24gl-playlistMusic4"></use>
                    </svg>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
export default({
    setup(props) {
        console.log(props);
    },
    props:['itemList','subscribedCount'],
    methods:{
        playMusic:function(i){
            this.updatePlayList(this.itemList)
            this.updatePlayListIndex(i)
        },
        ...mapMutations(['updatePlayList','updatePlayListIndex'])
    }
});
</script>
<style scoped>
.itemMusicList{
    width:100%;
    height:10rem;
    background-color: #fff;
    padding:0 0.2rem;
    margin-top:0.2rem;
    border-top-left-radius: .4rem;
    border-top-right-radius:.4rem;
}
.itemMusicList .itemListTop{
    width:100%;
    height:1rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
}
/* 播放样式 */
.itemMusicList .itemListTop .listLeft{
    width:3rem;
    height:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.itemMusicList .listLeft .icon{
    stroke:#333333;
    stroke-width:20;
}
.itemMusicList .listLeft span{
    font-weight:700;
}

.itemMusicList .listLeft span span{
    font-weight: 400;
    font-size: 0.24rem;
    color: #999;
}
/* 收藏样式 */
.itemMusicList .itemListTop .listRight{
    display:flex;
    align-items:center;
    background-color:red;
    padding:.2rem;
    border-radius:.4rem;
    color:#fff;
}

/* 歌单列表 */
.itemMusicList .itemList{
    width:100%;
}
.itemMusicList .itemList .item{
    width:100%;
    height:1.4rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.itemMusicList .item .itemLeft{
    width:85%;
    height:100%;
    display:flex;
    align-items:center;
}
.itemMusicList .item .itemLeft .leftSpan{
    display:inline-block;
    width:.2rem;
    text-align:center;
}
.itemMusicList .itemLeft div{
    margin-left: 0.3rem;
}
.itemMusicList .itemLeft div p{
    width:4.54rem;
    height:.4rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-weight:700;
}
.itemMusicList .itemLeft div span{
    font-weight:400;
    font-size:.24rem;
    color:#999;
}
.itemMusicList .itemRight{
    width:20%;
    height:80%;
    display:flex;
    align-items:center;
    position:relative;
}
.itemMusicList .itemRight .icon{
    fill:#999;
}
.itemMusicList .itemRight .bofang{
    position:absolute;
    left:0px;
}
.itemMusicList .itemRight .liebiao{
    position:absolute;
    right:0px;
}
</style>
