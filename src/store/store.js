import Vue from 'vue'
import Vuex from 'vuex'

// 使用
Vue.use(Vuex)

export const store = new Vuex.Store({
    state :{
        kindsList :[] ,
        isLogin :false,
        username : null
    },
    getters:{
        
    },
    mutations : {
        add(state,data){
            state.kindsList.push(data)
        },
        setList (state, data){
            state.kindsList = data;
        },
        remove (state, i){
            state.kindsList.splice(i, 1)
        },
        login (state, data){
            state.username = data
            state.isLogin = true
        },
        removeUser (state){
            state.isLogin = false;
            state.username = null
        }
    }
})

