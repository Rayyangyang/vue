<template>
    <div id="info" class="container">
        <form  class="container">
            <div v-show='flag'>
                <div class="form-group">
                    <label for="exampleInputEmail1">姓名</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" v-model='user.name' readonly>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">年龄</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" v-model='user.age' readonly>
                </div>
            <div class="form-group">
                    <label for="exampleInputPassword1">性别</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" v-model='user.sex' readonly>
                </div>
            </div>
            
            <div v-show='!flag'>
                <div class="form-group">
                    <label for="exampleInputEmail1">姓名</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" v-model='user.name'>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">年龄</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" v-model='user.age'>
                </div>
            <div class="form-group">
                    <label for="exampleInputPassword1">性别</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" v-model='user.sex'>
                </div>
            </div>  
            <button type="button" class="btn btn-info" v-on:click='edit'>编辑</button>
            <button type="button" class="btn btn-info" v-on:click='change' v-show='!flag'>提交</button>
            <button type="button" class="btn btn-info" v-on:click='remove(user.id)'>删除</button>
        </form>
        </table>
    </div>
</template>

<script>
export default {
    name : 'info',
    data(){
        return {
            id : this.$route.params.id,
            user : {},
            flag : true,
        }
    },
    created(){
        this.http.get(`users/${this.id}`)
            .then(res=>{
                this.user = res.data
            })
    },
    methods :{
        edit(){
            this.flag = !this.flag
        },
        change(){
            this.http.patch(`users/${this.id}`, this.user)
                .then(res => {
                    console.log(res)
                    alert('修改成功!!!')
                    this.$router.push('/')
                })
        },
        remove(id){
            this.http.delete(`users/${id}`)
                .then(res => {
                    console.log('删除成功')
                })
        }

    }
}
</script>

<style scoped>
    button{
        margin:20px;
    }
</style>
