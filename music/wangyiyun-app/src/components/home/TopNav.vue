<template>
    <div class="topNav">
    <!-- 目录图标样式 -->
    <div class="topLeft">
        <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-mulu"></use>
        </svg>
    </div>

    <!-- 顶部导航 -->
    <div class="topContent">
        <span @click="$router.push('/infoUser')">我的</span>
        <span class="active">发现</span>
        <span>云村</span>
        <span>视频</span>
    </div>

    <!-- 探索图标样式 -->
    <div class="topRight">
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-nav-07"></use>
        </svg>
    </div>
    </div>
</template>

<style>
    .topNav{
        width:100%;
        height:1rem;
        padding:.2rem;
        display:flex;
        justify-content: space-between;   /*显示行之间有空格的flex项目*/
        align-items:center;
    }
    .topNav .topContent{
        width:65%;
        height:100%;
        display:flex;
        justify-content:space-around;   /*显示行之前，之间，之后带有空格的flex项目*/
        align-items:center;
        font-size:.36rem;
    }
    .topNav .topContent .active{
        font-weight:900;
    }
</style>