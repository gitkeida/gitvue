<template>
  <div class="container">
      <hr>
      <h3 class="g-card_title">推荐歌单</h3>
      <div class="g-card_wrap">
          <ul class="g-card_list">
              <li class="g-card_item" v-for="i in 6">
                  <div class="g-image"><img :src="imgUrl" alt=""></div>
                  <p class="g-title">一年四季春夏秋冬</p>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgUrl:require("../../assets/img/39582418617683.jpg"),
      currentDate: new Date()
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .container{
        padding:0 0.15rem;   
    }
    .g-card_title{
        margin-bottom:0.1rem;
    }
    .g-card_list{
        display:flex;
        justify-content:space-between;
        flex-wrap:wrap;
        

        & >.g-card_item{
            width:1.05rem;
            margin-bottom:0.1rem;

            & >.g-image{
                border-radius:5px;
                overflow:hidden;
            }

            & img{
                width:100%;
                height:auto;
            }

            & .g-title{
                line-height:0.25rem;
                font-size:0.1rem;
            }


        }
    }
</style>
