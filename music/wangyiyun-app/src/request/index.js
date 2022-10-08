import axios from 'axios'
// 封装axios请求
let service = axios.create({    // 创建axios实例
    baseURL:'http://localhost:3000',    // 基础路径
    timeout:3000    // 返回时间
})
export default service