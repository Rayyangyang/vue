<template>
    <div id="home" class="container">
        <h1>用户管理</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>性别</th>
                    <th>详情</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='ele in users'>
                    <th scope="row">{{ele.id}}</th>
                    <td>{{ele.name}}</td>
                    <td>{{ele.age}}</td>
                    <td>{{ele.sex}}</td>
                    <td>
                        <router-link type="button" v-bind:to="'/info/'+ ele.id" class="btn btn-info" v-on:click = 'getInfo(ele.id)'>详情</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name : 'app-home',
    data (){
        return {
            users : []
        }
    },
    computed : {
    },
    created(){
        this.getUsers()
    },
    methods : {
        getUsers (){
            this.http.get('users')
                .then(res => {
                    this.users = res.data;
                })
        },
        getInfo(id){
            console.log(id)
        }

    }
}
</script>

<style scoped>

</style>

