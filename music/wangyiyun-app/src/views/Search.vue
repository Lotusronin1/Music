<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="刘大壮" v-model="searchKey" @keydown.enter="enterKey"/>
    </div>
    <div class="searchHistory">
        <span class="searchSpan">历史</span>
        <span v-for="item in keyWorldList" :key="item" class="spanKey" @click="searchHistory(item)">
        {{item}}
        </span>
        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div class="itemList">
            <div class="item" v-for="(item,i) in searchList" :key="i">
                <!-- 列表左边序号，歌名和歌手 -->
                <div class="itemLeft" @click="updateIndex(item)">
                    <span class="leftSpan">{{i+1}}</span>
                    <div>
                        <p>{{item.name}}</p>
                        <span v-for="(item1,index) in item.artists" :key="index">
                        {{item1.name}}
                        </span>
                    </div>
                </div>
                <!-- 列表右边图标 -->
                <div class="itemRight">
                    <svg class="icon bofang" aria-hidden="true" v-if="item.mvid !=0">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-24gl-playlistMusic4"></use>
                    </svg>
                </div>
            </div>
        </div>
</template>
<script>
import { getSearchMusic } from '@/request/api/home.js';

export default {
    data() {
        return {
            keyWorldList: [],
            searchKey: "",
            searchList: [],
        };
    },
    ounted() {
        this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList"))
        ? JSON.parse(localStorage.getItem("keyWorldList"))
        : [];
    },
    methods:{
        enterKey: async function(){
            if (this.searchKey !== "") {
            // 添加历史记录
            this.keyWorldList.unshift(this.searchKey);
            // 历史记录去重
            this.keyWorldList = [...new Set(this.keyWorldList)];
            // 固定历史记录长度
            if (this.keyWorldList.length > 10) {
            this.keyWorldList.splice(this.keyWorldList.length - 1, 1);
            }
            localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
            let res = await getSearchMusic(this.searchKey);
            // console.log(res);
            this.searchList = res.data.result.songs;
            this.searchKey = "";
            }
        },
        delHistory:function(){
            // 删除历史记录
            localStorage.removeItem("keyWorldList");
            this.keyWorldList = [];
        },
        searchHistory:async function (item) {
        let res = await getSearchMusic(item);
        this.searchList = res.data.result.songs;
        },
        updateIndex:function(item){
        item.al=item.album
        item.al.picUrl=item.album.artist.img1v1Url
        this.$store.commit("pushPlayList",item)
        this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)
        },
    },
};
</script>

<style scoped>
.searchTop{
    width:100%;
    height:1rem;
    padding:0.2rem;
    display:flex;
    align-items:center;
}
.searchTop input{
    margin-left:.2rem;
    border:none;
    border-bottom:1px solid #999;
    width:90%;
    padding:.1rem;
}
.searchHistory{
    width:100%;
    padding:.2rem;
    position:relative;
}
.searchHistory .searchSpan{
    font-weight:700;
}
.searchHistory  .spanKey{
    padding:.1rem .2rem;
    background-color:rgb(183, 179, 179);
    border-radius:.4rem;
    margin:.1rem .2rem;
    display:inline-block;
}
.searchHistory .icon{
    width:.3rem;
    height:.3rem;
    position:absolute;
    right: .2rem;
}

/* 列表 */
.itemList{
    width:100%;
    padding:.2rem;
}
.itemList .item{
    width:100%;
    height:1.4rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.itemList .item .itemLeft{
    width:85%;
    height:100%;
    display:flex;
    align-items:center;
}
.itemList .item .itemLeft .leftSpan{
    display:inline-block;
    width:.2rem;
    text-align:center;
}
.itemList .itemLeft div{
    margin-left: 0.3rem;
}
.itemList .itemLeft div p{
    width:4.54rem;
    height:.4rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-weight:700;
}
.itemList .itemLeft div span{
    font-weight:400;
    font-size:.24rem;
    color:#999;
}
.itemList .itemRight{
    width:20%;
    height:80%;
    display:flex;
    align-items:center;
    position:relative;
}
.itemList .itemRight .icon{
    fill:#999;
}
.itemList .itemRight .bofang{
    position:absolute;
    left:0px;
}
.itemList .itemRight .liebiao{
    position:absolute;
    right:0px;
}
</style>