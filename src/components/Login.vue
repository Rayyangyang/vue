<template>
      <div class="login">
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">用户名</label>
                <input type="text" class="form-control" placeholder="用户名"  v-model = 'username'>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">密码</label>
                <input type="password" class="form-control" placeholder="密码"  v-model = 'password'>
            </div>
            <button type="submit" class="btn btn-default" v-on:click.prevent = 'login'>登录</button>
        </form>
    </div>
</template>

<script>
export default {
    name : 'login',
    data (){
        return {
            username : '',
            password : ''
        }
    },
    beforeRouteEnter(to, from ,next){
        next(vm => {
            vm.$store.commit('removeUser')
        })
    },
    methods : {
        login (){
            this.http.get('users.json')
                .then(res => {
                    console.log(res.data)
                    var obj = res.data;
                    for(var prop in obj){
                        if(this.username == obj[prop].username && this.password == obj[prop].password){
                            this.$router.push('/');
                            this.$store.commit('login', this.username);
                            return;
                        }else{
                            alert('用户名或者密码输入错误，请重新登录');
                            return;
                        }
                    }
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

