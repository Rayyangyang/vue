<template>
    <div class="register">
        <form>
        <div class="form-group">
            <label for="exampleInputEmail1">用户名</label>
            <input type="text" class="form-control"placeholder="用户名"  v-model = 'username'>
        </div>
         <div class="form-group">
            <label for="exampleInputEmail1">邮箱</label>
            <input type="text" class="form-control" placeholder="邮箱" v-model = 'email'>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">密码</label>
            <input type="password" class="form-control" placeholder="密码"  v-model = 'password'>
        </div>
        <button type="submit" class="btn btn-default" v-on:click.prevent = 'register'>注册</button>
        </form>
    </div>
</template>

<script>
export default {
    name :'register',
    data (){
        return {
            username : '',
            email : '',
            password : ''
        }
    },
    methods : {
        register (){
            console.log(this.username)
            var user = {
                username : this.username,
                email : this.email,
                password : this.password
            }
            this.http.post('users.json', user)
                .then(res => {
                    this.$router.push('login')
                })
        }
    }
}
</script>

<style scoped>
    form{
        width:400px;
        margin: 0 auto;
    }
</style>


