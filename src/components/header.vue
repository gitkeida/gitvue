<template>
  <div class="container">
        <el-menu mode="horizontal" :default-active="menuActive" class="el-menu-demo g-menu">
          <el-menu-item index="1">我的</el-menu-item>
          <el-menu-item index="2">推荐</el-menu-item>
          <el-menu-item index="3">搜索</el-menu-item>
      </el-menu>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      menuActive:"1"

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .g-menu{
        height:0.4rem;
        display:flex;
        justify-content:space-between;        

        & li {
            height:0.4rem!important;
            line-height:0.4rem!important;
        }
    }
</style>
