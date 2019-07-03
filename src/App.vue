<template>
  <div id="app">
    <div class="container">
      <app-header></app-header>
      <router-view></router-view>
    </div>
    <div class="container">
          <div class="row">
              <div class="col-sm-12 col-md-4">
                  <router-view name='contact'></router-view>
                  <router-view name='express'></router-view>
                  <router-view name='history'></router-view>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import header from './components/Header'
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components : {
    'app-header' : header
  }
}
</script>

<style scoped>
</style>
