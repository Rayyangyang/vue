<template>
    <div class="single-bog">
        <h3>{{singleList.title}}</h3>
        <p>{{singleList.content}}</p>
    </div>    
</template>

<script>
export default {
    name : 'single-bolg',
    data (){
        return {
            id : this.$route.params.id,
            singleList : []
        }
    },
    created(){
        console.log(11)
        this.http.get('https://wd9745392831tnadcr.wilddogio.com/addBlog/' + this.id + '.json')
            .then(res => {
                this.singleList = res.data
                console.log(res.data)

            })
    }
}
</script>

<style>
    .single-bog{
        width:500px;
        margin:0 auto;
    }
</style>

