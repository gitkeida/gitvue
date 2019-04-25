<template>
  <div class="container">
      <h1>my-header</h1>
      <div class="g-header_wrap"></div>
      <p>推荐音乐</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .g-header_wrap{
        height:0.4rem;
        width:1rem;
        border:1px solid red;
        
    }
    p{
        font-size:0.15rem;
    }
</style>
