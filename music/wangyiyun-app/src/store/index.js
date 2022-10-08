import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item.js'
import {getPhoneLogin} from '@/request/api/home.js'
export default createStore({
  state: {
    // 播放列表(添加默认值)
    playList:[{
      al:{
        id: 17177,
        name: "沧海一声笑",
        pic: 109951164241266770,
        picUrl: "https://p1.music.126.net/myqxbSG7NOZOUGMjgpYzZg==/109951164241266763.jpg",
        pic_str: "109951164241266763",
      },
      id:170749,
      name:"沧海一声笑",
      ar:[{name:"许冠杰"}]
    }],
    playListIndex:0,  // 默认下标为0
    isbtnShow:true,   // 暂停按钮的显示
    detailShow:false,  // 歌曲详情页的显示
    lyricList:{},     // 歌词部分
    currentTime:0,    // 获取歌词当前时间
    duration:0,       //歌曲总时长
    isLogin:false,    // 判断是否登录
    isFooterMusic:true,   // 判断底部组件是否需要显示
    token:"",
    user:{},//用户信息
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isbtnShow = value
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    updatePlayList:function(state,value){
      state.playList = value
    },
    updatePlayListIndex:function(state,value){
      state.playListIndex = value
    },
    updateDetailShow:function(state){
      state.detailShow=!state.detailShow
    },
    updatelyricList:function(state,value){
      state.lyricList=value
    },
    updateCurrentTime:function(state,value){
      state.currentTime=value
    },
    updateDuration:function(state,value){
      state.duration=value
    },
    updateIsLogin:function(state,value){
      state.isLogin=true
    },
    updateToken:function(state,value){
      state.token=value
      localStorage.setItem('token',state.token)
    },
    updateUser:function(state,value){
      state.user=value
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res=await getMusicLyric(value)
      console.log(res);
      context.commit("updatelyricList",res.data.lrc)
    },
    getLogin: async function(context,value){
      let res=await getPhoneLogin(value);
      return res
    }
  },
  modules: {},
})
