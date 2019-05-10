<template>
  <div id="app">
    <myHeader></myHeader>

    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    
    <router-view v-if="!$route.meta.keepAlive"></router-view>


    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '@/components/header'
import myFooter from '@/components/footer'
export default {
  name: 'App',
  components:{myHeader,myFooter}
}
</script>

<style scoped>
  #app{
    padding-bottom:0.5rem;
  }
</style>
