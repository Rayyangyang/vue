// 引入axios
import axios from 'axios'

var http = 'http://192.168.43.24:3333/'

export var headerInfo = ()=>{
    return axios.get(http + 'api/seller')

}
export var getGoods = ()=>{
    return axios.get(http + 'api/goods')

}
export var getRatings = ()=>{
    return axios.get(http + 'api/ratings')

}