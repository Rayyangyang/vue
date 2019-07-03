<template>
  <div id="app">
    <app-heade></app-heade>
    <router-view></router-view>
  </div>
</template>

<script>
import heade from './components/Heade'

export default {
  name: 'app',
  components: {
    // showBlog : showBlog,
    'app-heade' : heade
  }
}
</script>

<style scoped>

</style>
