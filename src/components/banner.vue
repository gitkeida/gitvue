<template>
  <div class="">
     <div class="g-banner_wrap"
        @touchstart="start"
        @touchmove="move"
        @touchend="end"
     >
         <ul class="g-banner_list" 
            :style="{left:leftMsg + 'px',transition:duration}"
            ref = "bannerList"
            >
                <slot></slot>
         </ul>
     </div>
  </div>
</template>

<script>
export default {
  name: 'banner',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgUrl:require("../assets/img/1.gif"),
      o_start:null,         // 起点
      o_space:null,         // 移动距离
      leftMsg:0,            // left值
      o_startLeft:null,     // 起点left值
      d_time:"all .5s",     // 过度时间
      duration:"all .5s",   // 过度值
      active_lis:0,         
    }
  },
  props:['items','loop'],
  methods:{
      start:function(e){
          this.o_space = 0;
          this.o_start = e.targetTouches[0].pageX;
          this.o_startLeft = this.leftMsg;
      },
      move:function(e){
          let o_move = e.targetTouches[0].pageX;
          this.o_space = o_move - this.o_start;
          this.duration = '';
          this.setBannerLeft(this.o_startLeft + this.o_space);
      },
      end:function(e){
          this.duration = this.d_time;
          let wrapWid = this.$refs.bannerList.firstChild.clientWidth || this.$refs.bannerList.clientWidth;
          let isF = this.o_space < 0;
          let nowLeft = null;
          
          if(Math.abs(this.o_space) > wrapWid / 3)
          {

              isF ? this.active_lis+=1 : this.active_lis-=1;
              if(this.loop && this.active_lis == 0)
              { 
                  // if is first image, switch last image
                  this.duration = '';
                  nowLeft = (this.items + 1) * wrapWid * -1;
                  nowLeft = nowLeft + this.o_space;
                  this.setBannerLeft(nowLeft);
                  let _this = this;
                  setTimeout(function(){
                      _this.duration = _this.d_time;
                      _this.active_lis = _this.items;
                      _this.setBannerLeft(_this.active_lis * wrapWid * -1);
                  },50)
                  return;
              }
              if(this.loop && this.active_lis == this.items + 1)
              {
                  // If it is the last image, switch to the first image
                  this.duration = '';
                  nowLeft = 0 + this.o_space;
                  this.setBannerLeft(nowLeft);
                  let _this = this;
                  setTimeout(function(){
                      _this.duration = _this.d_time;
                      _this.active_lis = 1;
                      _this.setBannerLeft(_this.active_lis * wrapWid * -1);
                  },50)
                  return;
              }

              !this.loop && this.active_lis < 0 && (this.active_lis = 0);
              !this.loop && this.active_lis > (this.items-1) && (this.active_lis = this.items-1);
              
              nowLeft = wrapWid * this.active_lis * -1;
              this.setBannerLeft(nowLeft);
          }
          else
          {
              this.setBannerLeft(this.o_startLeft);
          }

      },

      setBannerLeft:function(left){
          this.leftMsg = left;
      },
      infinite:function(){
          // 克隆第一张和最后一张，
          let bannerList = this.$refs.bannerList,
              first = bannerList.firstChild.cloneNode(true),
              last = bannerList.lastChild.cloneNode(true);
          bannerList.insertBefore(last,bannerList.firstChild);
          bannerList.appendChild(first);
      }
  },
  mounted:function(){
      this.loop && this.infinite();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .g-banner_wrap{
        width:100%;
        height:1.2rem;
        position:relative;
        overflow:hidden;

        & >.g-banner_list{
            position:relative;
            height:100%;
            display:flex;
            left:0px;
            

            & >.g-banner_item{
                min-width:100%;
                height:100%;

                & img{
                    width:100%;
                    height:100%;
                }
            }
        }
    }

</style>
