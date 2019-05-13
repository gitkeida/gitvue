<template>
  <div class="g-bar_bg_wrap"         
        @touchstart.stop="start"
        @touchmove.stop="move"
        @touchend.stop="end"
        ref="barWrap"    
    >

      <div class="g-bar_bg" >
          <div class="g-bar" :style="{width:timing +'%'}"></div>
          <span class="g-bar_dot" :class="{big:isDot}" :style="{left:timing + '%'}"></span>
      </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  name: 'progressBar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      o_start:null,
      o_move:null,
      offsetLeft:null,
      barWidth:null,
      isDot:false,

    }
  },
  computed:{
      ...mapState(['timing','isPlaying','duration'])
  },
  methods:{
      ...mapMutations(['TIMING','IS_PLAYING','SET_CURRENT_TIME']),
      start:function(e){
          this.IS_PLAYING(false);
          this.isDot = true;
          let wrap = this.$refs.barWrap;
          this.offsetLeft = wrap.offsetLeft;
          this.barWidth = wrap.clientWidth;

          let pageX = e.targetTouches[0].pageX;
          this.o_start = pageX - this.offsetLeft;

          this.TIMING(this.o_start / this.barWidth * 100);
          console.log(this.o_start)
          console.log(this.barWidth)
      },
      move:function(e){
          let pageX = e.targetTouches[0].pageX;
          this.o_start = pageX - this.offsetLeft;
          let dot = this.o_start / this.barWidth * 100;
          dot < 0 && (dot = 0);
          dot > 100 && (dot = 100);
          this.TIMING(dot);
      },
      end:function(e){
          this.isDot = false;
          let time_s = this.timing * 0.01 * this.duration;
          this.SET_CURRENT_TIME(Math.floor(time_s));
      },
  },
  mounted:function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .g-bar_bg_wrap{
        padding:0.07rem 0;
    }
    .g-bar_bg{
        width:2.5rem;
        height:0.02rem;
        background:rgba(255,255,255,0.25);
        position:relative;

        &>.g-bar{
            height:100%;
            background:rgba(255,255,255,0.4);
        }

        & .g-bar_dot{
            position:absolute;
            width:0.06rem;
            height:0.06rem;
            background:#fff;
            top:0;
            bottom:0;
            margin:auto;
            border-radius:50%;
            transform:translateX(-50%);
            transition:transform .2s;

            &.big{
                transform:translateX(-50%) scale(2);
            }
        }
    }
</style>
