import Vue from 'vue'
import Vuex from 'vuex'
import { getGoods } from './apis/apis'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        goodsList: []
    },
    mutations: {
        getGoodsList(state, res) {
            state.goodsList = res
        },
        // 点击改变num的值
        changeNum(state, obj) {
            for (let i = 0; i < state.goodsList.length; i++) {
                for (let j = 0; j < state.goodsList[i].foods.length; j++) {
                    if (state.goodsList[i].foods[j].id == obj.id) {
                        state.goodsList[i].foods[j].num += obj.val;
                        state.goodsList[i].listNum += obj.val
                        
                    }
                }
            }
        }
    },
    actions: {
        // 获得全部数据
        async getGoodsList(context) {
            let res = (await getGoods()).data.data;
            // 添加需要的字段 num 
            let id = 0;
            for (let i = 0; i < res.length; i++) {
                res[i].listNum = 0 ;
                for (let j = 0; j < res[i].foods.length; j++) {
                    id++;
                    res[i].foods[j].num = 0;
                    res[i].foods[j].id = id;
                }
            }
            context.commit('getGoodsList', res)
        }
    },
    getters: {
        getCarList(state) {
            var arr = []
            for (let i = 0; i < state.goodsList.length; i++) {
                for (let j = 0; j < state.goodsList[i].foods.length; j++) {
                    if (state.goodsList[i].foods[j].num > 0) {
                        arr.push(state.goodsList[i].foods[j])
                    }
                }
            }
            return arr
        },
    }
})