<template>
  <div class="container">
        <el-menu mode="horizontal" :default-active="menuActive" :router="true" class="el-menu-demo g-menu">
          <el-menu-item index="/home" >我的</el-menu-item>
          <el-menu-item index="/2" >推荐</el-menu-item>
          <el-menu-item index="/search" >搜索</el-menu-item>
      </el-menu>

  </div>
</template>

<script>
export default {
  name: 'myheader',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      menuActive:"/",

    }
  },
  mounted:function(){
      this.menuActive = this.$route.fullPath;
  },
  watch:{
    '$route':function(){
        this.menuActive = this.$route.fullPath;
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
