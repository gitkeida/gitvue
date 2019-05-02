<template>
  <div class="g-bar_bg_wrap"         
        @touchstart.stop="start"
        @touchmove.stop="move"
        @touchend.stop="end"
        ref="barWrap"    
    >

      <div class="g-bar_bg" >
          <div class="g-bar" :style="{width:timing +'%'}"></div>
          <span class="g-bar_dot" :style="{left:timing + '%'}"></span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'progressBar',
  props:{
      timing:{
          default:0
      }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      o_start:null,
      o_move:null,
      offsetLeft:null,
      barWidth:null,

    }
  },
  computed:{
      doting:function(){
      }
  },
  methods:{
      start:function(e){
          let pageX = e.targetTouches[0].pageX;
          this.o_start = pageX - this.offsetLeft;
          console.log(this.o_start)
          console.log(this.barWidth)
          this.timing = this.o_start / this.barWidth * 100;
      },
      move:function(e){},
      end:function(e){},
  },
  mounted:function(){
      let wrap = this.$refs.barWrap;
      this.offsetLeft = wrap.offsetLeft;
      this.barWidth = wrap.clientWidth;
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
        }
    }
</style>
