<template>
    <div class="itemMusicTop">
        <!-- 背景图片 -->
        <img :src="playlist.coverImgUrl" alt="" class="bgimg"/>
        <div class="itemLeft">
            <!-- 后退按钮 -->
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <!-- 搜索按钮 -->
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-nav-07"></use>
            </svg>
            <!-- 列表按钮 -->
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
        </div>
    </div>

    <div class="itemTopContent">
        <div class="contentLeft">
            <img :src="playlist.coverImgUrl" alt=" "/>
            <div class="playCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gl-play"></use>
                </svg>
                <span>{{changeCount(playlist.playCount)}}</span>
            </div>
        </div>

    <div class="contentRight">
        <p class="rightP_one">{{playlist.name}}</p>
        <div class="right_img">
            <img :src="playlist.creator.backgroundUrl" alt=""/>
            <span>{{playlist.creator.nickname}}</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-youjiantou"></use>
            </svg>
        </div>
        <p class="rightP_two">
            <span>{{playlist.description}}</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-youjiantou"></use>
            </svg>
        </p>
    </div>
    </div>

    <div class="itemTopFooter">
        <!-- 消息按钮 -->
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi1"></use>
            </svg>
            <span>{{playlist.commentCount}}</span>
        </div>
        <!-- 分享按钮 -->
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{playlist.shareCount}}</span>
        </div>
        <!-- 下载按钮 -->
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <span>下载</span>
        </div>
        <!-- 多选按钮 -->
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon--duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>
</template>
<script>
export default {
    setup(props) {
    // console.log(props);
    // 通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的
    if((props.playlist.creator="")){
        props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator
    }

    // 对播放量的处理
    function changeCount(num) {
        if (num >= 100000000) {
            return (num / 100000000).toFixed(1) + "亿";
        } else if (num >= 10000) {
            return (num / 10000).toFixed(1) + "万";
        }
    }
    return{changeCount}
    },
    props:['playlist'],
}
</script>
<style scoped>
    .itemMusicTop {
        width:100%;
        height:1rem;
        display:flex;
        justify-content:space-between;
        align-items:center;
        /* padding:.2rem; */
        position:relative;
    }
    .itemMusicTop .itemLeft,.itemRight{
        width:25%;
        height:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin:0 .2rem;
    }
    .itemMusicTop .itemLeft span{
        font-size:.4rem;
        color:#fff;
    }
    .itemMusicTop .icon{
        /* 填充颜色 */
        fill:#fff;  
    }
    .itemMusicTop .bgimg{
        width:100%;
        height:11rem;
        position:absolute;
        z-index:-1;
        /* filter在vue3中是虚化 */
        filter:blur(30px);
    }
    .itemTopContent{
        width: 100%;
        height: 3rem;
        padding: 0.2rem;
        margin-top: 0.4rem;
        display: flex;
        justify-content: space-between;
    }

    /* 左边内容 */
    .itemTopContent .contentLeft {
        width: 36%;
        height: 2.6rem;
        position: relative;
    }
    .itemTopContent .contentLeft img{
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 0.2rem;
        position: absolute;
        z-index: -1;
    }
    .itemTopContent .contentLeft .playCount{
        position: absolute;
        right: 0.1rem;
        margin-top: 0.1rem;
    }
    .itemTopContent .playCount .icon{
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.02rem;
        vertical-align: middle;
    }
    .itemTopContent .playCount span{
        font-size: 0.26rem;
        color: #fff;
    }

    /* 右边内容 */
    .contentRight{
        width: 60%;
        height: 2.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .contentRight .rightP_one{
        font-size: 0.3rem;
        font-weight: 900;
        color: #fff;
        font-family: "微软雅黑";
    }
    .contentRight .right_img{
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        color: #ccc;
    }
    .contentRight .right_img img{
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
    }
    .contentRight .right_img span{
        margin-left: 0.1rem;
    }
    .contentRight .right_img .icon{
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.08rem;
        vertical-align: middle;
    }

    .contentRight .rightP_two{
        width: 100%;
        height: 0.6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .contentRight .rightP_two span{
        display: inline-block;
        width:95%;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        font-size:.24rem;
        color:#ccc;
    }
    .contentRight .rightP_two .icon{
        width:.24rem;
        height:.24rem;
    }

    .itemTopFooter{
        width:100%;
        height:1.4rem;
        display:flex;
        justify-content:space-around;
        margin-top:.2rem;
    }
    .itemTopFooter .footerItem{
        display:flex;
        flex-direction:column;
        align-items:center;
        color:#fff;
    }
    .itemTopFooter .footerItem .icon{
        fill:#fff;
    }
    .itemTopFooter .footerItem span{
        margin-top:.1rem;
    }
</style>