<template>
  <div id="app">
    <myHeader></myHeader>
    <router-view/>
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
</style>
