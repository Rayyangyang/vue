<template>
    <div class="admin">
        <div class="row">
            <div class="col-lg-8 col-md-8">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">品种</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" v-model = 'kind'>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword3" class="col-sm-2 control-label">价格</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" v-model = 'price'>
                        </div>
                    </div>
                    <button type="button" class="btn btn-info" v-on:click = 'add'>添加</button>
                </form>
                
            </div>
            <div class="col-lg-4 col-md-4 menu">
                <div class="page-header">
                    <h1>Menu</h1>
                </div>  
                <div class="box">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>品种</th>
                                <th>删除</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='(ele, i) in getList'>
                                <td>{{ ele.kind }}</td>
                                <td >
                                    <span class="glyphicon glyphicon-remove-circle remove" v-on:click="remove(ele, i, getList)"></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'admin',
    data (){
        return {
            kind : '',
            price : '',
            kinds :[

            ],
            listId :[

            ]
        }
    },
    computed :{
        getList(){
            return this.$store.state.kindsList;
        },
    },
    created(){
        this.http.get('kind.json')
            .then(res => {
                var arr = [];
                for(var i in res.data){
                    this.listId.push(i)
                    arr.push(res.data[i])
                }
                this.$store.commit('setList', arr);
            })
        
    },
    methods : {
        add (){
            let data = {
                kind : this.kind,
                price : this.price
            }
            this.http.post('kind.json', data)
                .then(res => {
                    this.$store.commit('add',data)
                })
        },
        remove (ele, i, getList){
            // 本地删除
            this.$store.commit('remove', i)
            var id = this.listId[i];
            console.log(id)
            this.http.delete(`kind/${id}.json`)
                .then(res => {
                    console.log(res)
                })
        }
    }
}
</script>

<style scoped>
    form{
        margin-top:40px;
    }
    form input{
        margin-bottom:20px;
    }
    form button{
        width:400px;
        margin-left:120px;
    }
    .menu h1{
        margin: 0px;
        padding:0px;
    }
    .menu div{
        margin: 0px;
        padding:0px;
    }
    table tr{
        padding:0 30px;
    }
    table tr td:nth-of-type(2){
        text-align:right;
    }
    table tr th:nth-of-type(2){
        text-align:right;
    }
</style>
