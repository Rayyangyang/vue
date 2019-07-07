<template>
    <div id="addUser">
        <form  class="container">
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
            <button type="button" class="btn btn-info" v-on:click = 'add'>添加</button>
        </form>
    </div>
</template>

<script>
export default {
    name : 'addUser',
    data (){
        return {
            user:{
                name : '',
                age : '',
                sex : ''
            }
        }
    },
    methods :{
        add (){
            let data = this.user;
            console.log(data)
            this.http.post('users', data)
                .then(res => {
                    alert('添加成功!!!')
                    this.$router.push('/')
                })
        }
    }

}
</script>

<style scoped>
form{
    width:400px;
}
button{
    width:370px;
}

</style>
