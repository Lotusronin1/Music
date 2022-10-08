function remSize(){
    // 获取设备的宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth
    // 固定设备宽度,大不超过750，小不超过320
    if(deviceWidth >= 750){
        deviceWidth = 750
    }
    if(deviceWidth <= 320){
        deviceWidth = 320
    }
    // 设计rem要根据设备的宽度，去调整HTML的fontSize(1rem = 100px)
    document.documentElement.style.fontSize = (deviceWidth/7.5)+'px'
    // 设置字体大小
    document.querySelector('body').style.fontSize=0.3+"rem"
}
remSize()
// 当窗口大小发生改变时,进行适配,调用remSize函数
window.onresize = function(){
    remSize()
}
