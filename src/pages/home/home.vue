<template>
    <div>
        <Banner :items="bannerList.length" :loop="true" :autoPlay="3000" :pagination="true">
             <li v-for="(item,i) in bannerList" :key="i">
                 <a href="">
                     <img :src="'./static/img/'+item.imgUrl"  alt="">
                 </a>
             </li>
        </Banner>
        <div class="container">
            <hr>
            <h3 class="g-card_title">推荐歌单</h3>
            <div class="g-card_wrap">
                <ul class="g-card_list">
                    <li class="g-card_item" v-for="i in 6" :key="i">
                        <div class="g-image"><img :src="imgUrl" alt=""></div>
                        <p class="g-title">一年四季春夏秋冬</p>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="g-imgbox" style='display:none;'>

        </div>

        <router-link to="/hello">go to hello w</router-link>
    </div>
</template>
<script></script>
    
<script>
import Banner from '@/components/banner'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgUrl:require("../../assets/img/39582418617683.jpg"),
      BannerimgUrl:require("../../assets/img/1.gif"),
      bannerList:[
          {imgUrl:'banner_01.jpg'},
          {imgUrl:'banner_02.jpg'},
          {imgUrl:'banner_03.jpg'},
      ],

      currentDate: new Date()
      
    }
  },
  components:{Banner},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .container{
        padding:0 0.15rem;   
    }
    .g-banner_wrap{
        margin:60px;
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

    .g-imgbox{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        margin-top: -100px;
        margin-left: -100px;
        box-sizing: border-box;
        border: 1px solid rgb(102, 102, 102);
        box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
        background: none repeat scroll 0% 0% transparent;
    }
</style>
