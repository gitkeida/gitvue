<template>
  <div class="container">
      <div class="g-footer_wrap">
            <div class="g-footer_left">
                <div class="g-image">
                    <img :src="imgUrl" alt="">
                </div>
                <div class="g-title">
                    <h5>春夏秋冬</h5>
                    <p>张国荣</p>
                </div>
            </div>

            <div class="g-footer_right">
                <div class="g-play">
                    <i class="el-icon-caret-right"></i>
                </div>
            </div>

          
          
      </div>
  </div>
</template>

<script>
export default {
  name: 'myfooter',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgUrl:require("../assets/img/39582418617683.jpg")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .g-footer_wrap{
        position:fixed;
        bottom:0;
        height:0.5rem;
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        border-top:1px solid #ccc;
        padding:0 0.15rem;

        & .g-footer_left{
            display:flex;
            align-items:center;

            & >.g-image{
                width:0.3rem;
                height:0.3rem;
                border-radius:50%;
                overflow:hidden;
                margin-right:0.1rem;

                & >img{
                    width:100%;
                    height:100%;
                }
            }

            & >.g-title{
                & >h5{
                    font-size:0.1rem;
                    margin-bottom:0.03rem;
                }
                & >p{
                    font-size:0.1rem;
                    color:#999;
                }
            }


        }

        & >.g-footer_right{
            & >.g-play{
                width:0.3rem;
                height:0.3rem;
                border-radius:50%;
                border:1px solid green;
                display:flex;
                justify-content:center;
                align-items:center;
                position:relative;

                & >i{
                    color:green;
                    font-size:0.18rem;
                }

                & >.g-progress{
                    position:absolute;
                    top:0;
                    left:0;

                }


            }
        }
    }
</style>
