<template>
    <div class="add_blog container">
        <div class="page-header">
            <h1>添加博客</h1>
        </div>
        <form v-show='isSubmit'>
            <div class="form-group">
                <label for="exampleInputEmail1">标题</label>
                <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Email" v-model="blog.title">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">内容</label>
                <textarea type="text" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model='blog.content'>
                </textarea>
            </div>
            <div class="checkbox">
                <label>html</label>
                <input type='checkbox' value="html" v-model="blog.arr">
                <label>css</label>
                <input type='checkbox' value="css" v-model="blog.arr">
                <label>js</label>
                <input type='checkbox' value="js" v-model="blog.arr">
                <label>vue</label>
                <input type='checkbox' value="vue" v-model="blog.arr">
                <label>react</label>
                <input type='checkbox' value="react" v-model="blog.arr">
            </div>
            <div class="author">
                <select v-model='blog.author'>
                    <option value="sunny">sunny</option>
                    <option value="ray">ray</option>
                    <option value="bob">bob</option>
                    <option value="jerry">jerry</option>
                </select>
            </div>
            <button type="submit" class="btn btn-default" v-on:click.prevent = 'submit'>Submit</button>
        </form>
        <h1 v-show="!isSubmit">提交成功</h1>
        <div class="preview">
            <p>博客预览</p>
            <p>{{blog.title}}</p>
            <p>{{blog.content}}</p>
            <ul v-for='ele in blog.arr'>
                <li>{{ele}}</li>
            </ul>
            <p>{{blog.author}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name : 'add_blog',
    data (){
        return {
            blog :{
                title : '',
                content : '',
                arr : [],
                author : ''
            },
            isSubmit : true
        }
    },
    methods : {
        submit (){
            const data = {
                title : this.blog.title,
                content : this.blog.content,
                arr : this.blog.arr,
                author : this.blog.author
            }
            console.log(data)
            this.http.post('addBlog.json', data)
                .then( res => {
                    console.log(res)
                    this.isSubmit = false;
                })
        }
    }
}
</script>

<style scoped>
    .add_blog h1{
        text-align: center;
    }
    .add_blog .page-header{
        border-bottom: 2px solid black;
    }
    .checkbox input{
        margin-left:5px;
        position: static;
        vertical-align: -2px;
    }
    ul li{
        list-style: none;
    }
</style>

