<template>
    <div class="menuApp">
        <table class="table">
            <thead>
                <tr>
                    <th>品种</th>
                    <th>价格</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = 'ele in get'>
                    <th>{{ ele.kind }}</th>
                    <th>{{ ele.price }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name : 'menuApp',
    data (){
        return {


        }
    },
    created (){
        this.http.get('kind.json')
            .then(res => {
                this.$store.commit('setList', res.data)
            })
    },
    computed :{
        get(){
            return this.$store.state.kindsList
        }
            
    },
}
</script>
