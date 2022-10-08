import { Swipe,SwipeItem,Popup} from 'vant';
// 放入数组中
let plugins = [
    Swipe,SwipeItem,Popup
]

// 将app引用过来，得先导出去，再去循环遍历vant中的数据
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)    // 将这个值返回到index.js中的app去
    })
}