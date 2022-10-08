<template>
  <router-view/>
  <FooterMusic v-show="$store.state.isFooterMusic"/>
</template>
<script>
import FooterMusic from '@/components/item/FooterMusic.vue'

export default({
  components:{
    FooterMusic
  }
})
</script>


<style lang="less">
  // 设置全局总样式
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;  // 定义元素的宽度和高度，它可以包含内边距和边框
  }
  // 设置目录ic图标
  .icon{
    width:.5rem;
    height:.5rem;
  }
  a{
    color:black;
  }
</style>
