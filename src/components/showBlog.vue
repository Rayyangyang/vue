<template>
    <div id="showBlog">
        <div class="search">
            搜索:<input type="text" v-model = 'search'>
        </div>
        <div class="single-blog" v-for="ele in filterList">
            <router-link v-bind:to="'/blog/' + ele.id">
                <h3 v-rainbow>{{ ele.title | to-upperCase}}</h3>
            </router-link>
            <p>作者:{{ ele.author }}</p>
            <p>{{ele.content}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name : 'showBlog',
    data (){
        return {
            list : [],
            search : ''
        }
    },
    created (){
        this.http.get('addBlog.json')
            .then(res => {
                let data = JSON.parse(JSON.stringify(res.data));
                let arr = []
                console.log(data)
                for(var prop in data){
                    data[prop].id = prop;
                    arr.push(data[prop])
                }
                this.list = arr;
            })
    },
    computed :{
        filterList(){
            return this.list.filter((ele) => {
               return ele.title.match(this.search)
            })
        }
    },
    filters : {
        'to-upperCase'(value){
            return value.toUpperCase();
        }
    }
}
</script>

<style scoped>
    #showBlog{
        width:100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .single-blog{
        width: 60%;
        background-color: #ccc;
        margin-bottom:20px;
        padding:0 20px;;
    }
    .search{
        margin-bottom:20px;
        font-size: 20px;
        color:rgb(39, 160, 75);
        font-weight: bold;
    }
    .search input{
        width:400px;
        height: 35px;
        padding:3px 10px;
    }

</style>
