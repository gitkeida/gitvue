<template>
  <div class="">
     <div class="g-banner_wrap"
        @touchstart.stop="!PC && items > 1 &&  start($event)"
        @touchmove.stop="!PC && items > 1 && move($event)"
        @touchend.stop="!PC && items > 1 && end($event)"

        @dragstart="PC && items > 1 && dragstart($event)"
        @dragover="PC && items > 1 && dragover($event)"
        @dragend="PC && items > 1 && end($event)"
     >
         <ul class="g-banner_list" 
            :style="{left:leftMsg + 'px',transition:duration}"
            ref = "bannerList"
            >
                <slot></slot>
         </ul>
         <ul v-if="items >1 && pagination" class="g-banner_pagination" >
             <li v-for="(i,idx) in items" :key="i" :class="{active: loop ? (active_lis == i) : (active_lis == idx)}" @click.stop="paginationClick(loop ? i : idx)"></li>
         </ul>
     </div>
  </div>
</template>

<script>
export default {
  name: 'banner',
  data () {
    return {
      msg: 'this is banner component',
      o_start:null,         // start
      o_space:null,         // space
      leftMsg:0,            // left
      o_startLeft:null,     // start left
      wrapWid:null,         // wrap width
      d_time:"all .5s",     // duration time
      duration:"all .5s",   // duration value
      active_lis:0,         // active item
      timer:null,           // timer
      
      PC:false,
    }
  },
  props: {
      items:{
          default:1
      },
      loop:Boolean,
      autoPlay:Number,
      pagination:Boolean,
  },
  methods:{
      start:function(e){
          this.autoPlay && this.stopBanner();
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
          let isF = this.o_space < 0;
          let nowLeft = null;
          this.autoPlay && this.startBanner();
          
          if(Math.abs(this.o_space) > this.wrapWid / 3)
          {

              isF ? this.active_lis+=1 : this.active_lis-=1;
              if(this.loop && this.active_lis == 0)
              { 
                  // if is first image, switch last image
                  this.duration = '';
                  nowLeft = (this.items + 1) * this.wrapWid * -1;
                  nowLeft = nowLeft + this.o_space;
                  this.setBannerLeft(nowLeft);
                  let _this = this;
                  setTimeout(function(){
                      _this.duration = _this.d_time;
                      _this.active_lis = _this.items;
                      _this.setBannerLeft(_this.active_lis * _this.wrapWid * -1);
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
                      _this.setBannerLeft(_this.active_lis * _this.wrapWid * -1);
                  },50)
                  return;
              }

              !this.loop && this.active_lis < 0 && (this.active_lis = 0);
              !this.loop && this.active_lis > (this.items-1) && (this.active_lis = this.items-1);
              
              nowLeft = this.wrapWid * this.active_lis * -1;
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
          // clone the first and last image
          let bannerList = this.$refs.bannerList,
              first = bannerList.firstChild.cloneNode(true),
              last = bannerList.lastChild.cloneNode(true);
          bannerList.insertBefore(last,bannerList.firstChild);
          bannerList.appendChild(first);
          this.active_lis = 1;
          this.duration = '';
          this.setBannerLeft(this.wrapWid * -1);
          let _this = this;
          setTimeout(function(){
              _this.duration = _this.d_time;
          },50)
      },
      banner:function(){
          this.active_lis++;
          !this.loop && this.active_lis >= this.items && (this.active_lis = 0);     // ！loop

          if(this.loop && this.active_lis >= this.items + 1)                        // loop 
          {
                  this.duration = '';
                  this.setBannerLeft(0);
                  let _this = this;
                  setTimeout(function(){
                      _this.duration = _this.d_time;
                      _this.active_lis = 1;
                      _this.setBannerLeft(_this.wrapWid * _this.active_lis * -1);
                  },50)
                  return;
          }
          
          this.setBannerLeft(this.active_lis * this.wrapWid * -1);
      },
      startBanner(){
          let _this = this;
          this.timer = setInterval(function(){
              _this.banner();
          },this.autoPlay)
      },
      stopBanner(){
          if(this.timer !== null)
          {
              clearInterval(this.timer);
              this.timer = null;
          }
      },
      paginationClick:function(idx){
          this.stopBanner();
          this.active_lis = idx;
          this.setBannerLeft(this.wrapWid * this.active_lis * -1);
          this.startBanner();
      },
      resize(){
          this.wrapWid =  this.$refs.bannerList.clientWidth || _this.$refs.bannerList.firstChild.clientWidth;
          this.PC = this.ISPC();
      },
      ISPC(){
          var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
                
            }
            return flag;
      },
      dragstart:function(e){
          this.autoPlay && this.stopBanner();
          this.o_space = 0;
          this.o_start = e.pageX;
          this.o_startLeft = this.leftMsg;
      },
      dragover:function(e){
          e.preventDefault();
          let o_move = e.pageX;
          this.o_space = o_move - this.o_start;
          this.duration = '';
          this.setBannerLeft(this.o_startLeft + this.o_space);
      },
      
  },
  mounted:function(){

      window.addEventListener("resize",this.resize)
      this.resize();
      this.loop && this.infinite();
      this.items > 1 && this.autoPlay && this.startBanner();
  },
  beforeDestroy:function(){
      this.stopBanner();
      window.removeEventListener("resize",this.resize);
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
            

            & >li{
                min-width:100%;
                height:100%;

                & img{
                    width:100%;
                    height:100%;
                }
            }
        }

        & >.g-banner_pagination{
            width:100%;
            height:0.2rem;
            display:flex;
            justify-content:center;
            align-items:center;
            position:absolute;
            bottom:0.01rem;

            & >li{
                width:0.08rem;
                height:0.08rem;
                background:#fff;
                border-radius:50%;
                margin:0 0.05rem;

                &.active{
                   background:pink ;
                }
            }


        }
    }

</style>
