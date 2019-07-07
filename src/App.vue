<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/Header'

export default {
  name: 'app',
  components: {
      'app-header' : header
  }
}
</script>

<style>

</style>
