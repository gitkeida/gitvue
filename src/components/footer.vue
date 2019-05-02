<template>
  <div class="container">
      <div class="g-footer_wrap">
            <div class="g-footer_left">
                <div class="g-image" :style="{transform:'rotate('+deg+'deg)'}">
                    <img :src="playData && playData.pic" alt="">
                </div>
                <div class="g-title">
                    <h5>{{playData && playData.name}}</h5>
                    <p>{{playData && playData.singer}}</p>
                </div>
            </div>

            <div class="g-footer_right" @click="play">
                <div class="g-play">
                    <i :class="isPlaying ? 'el-icon-video-pause' : 'el-icon-video-play'"></i>
                </div>
            </div>

            <div class="g-audio_wrap">
                <audio :src="playData && playData.url" :autoplay="isPlaying && 'autoplay'" controls ref="myAudio" 
                    @play="onplay"
                    @pause="onpause"
                    @ended="onended"
                    @loadstart="onloadstart"
                    @durationchange="ondurationchange"
                    @loadedmetadata="onloadedmetadata"
                    @loadeddata="onloadeddata"
                    @progress="onprogress"
                    @canplay="oncanplay"
                    @canplaythrough="oncanplaythrough"
                ></audio>
            </div>
            
            <div class="g-audio_progress" :style="{width:footerTiming + '%'}"></div>

          
      </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  name: 'myfooter',
  data () {
    return {
      timer:null,
      deg:0,
      degTimer:null,
    }
  },
  computed:{
      ...mapState(['playData','isPlaying','footerTiming'])
  },
  methods:{
      ...mapMutations(['IS_PLAYING','FOOTER_TIMING']),
      init(){
          this.deg = 0;
      },
      play(){
          // 播放/暂停
          let audio = this.$refs.myAudio;
          audio.ended && this.FOOTER_TIMING(this.deg = 0);
          this.isPlaying ? audio.pause() : audio.play();
      },
      onplay:function(){
          console.log("开始播放")
          this.IS_PLAYING(true);
          // 开始播放
          this.drageMove();
          this.degRotate();
      },
      onpause:function(){
          // 暂停播放
          console.log("暂停")
          this.IS_PLAYING(false);
          this.pauseTimer();
      },
      onended:function(){
          console.log("播放结束");
          this.FOOTER_TIMING(100);
          this.IS_PLAYING(false);
      },
      onloadstart:function(){console.log("当浏览器开始寻找指定的音频/视频时，会发生 loadstart 事件。即当加载过程开始时。")},
      ondurationchange:function(){console.log("当指定音频/视频的时长数据发生变化时，发生 durationchange 事件。")},
      onloadedmetadata:function(){console.log("当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件。")},
      onloadeddata:function(){console.log("当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时,发生 onloadeddata 事件");},
      onprogress:function(){console.log("当浏览器正在下载指定的音频/视频时，会发生 progress 事件。")},
      oncanplay:function(){console.log("当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件。")},
      oncanplaythrough:function(){console.log("当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时，会发生 canplaythrough 事件。")},
      drageMove:function(){
          // 进度
          let audio = this.$refs.myAudio,
              _this = this;
          clearInterval(this.timer);
          this.timer = setInterval(function(){
              _this.FOOTER_TIMING(audio.currentTime  / audio.duration * 100);
          },1000);
      },
      pauseTimer(){
          // 暂停定时器
          if(this.timer != null)
          {
              clearInterval(this.timer);
              this.timer = null;
          }
          if(this.degTimer != null)
          {
              clearInterval(this.degTimer);
              this.degTimer = null;
          }
      },
      degRotate(){
          // 唱碟旋转
          let _this = this;
          clearInterval(this.degTimer);
          this.degTimer = setInterval(function(){
               _this.deg += 1;
          },60)
      }
  },
  mounted:function(){
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
        border-top:1px solid #eee;
        padding:0 0.15rem;
        background:#fff;

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
                // border-radius:50%;
                // border:1px solid green;
                display:flex;
                justify-content:center;
                align-items:center;
                position:relative;

                & >i{
                    color:green;
                    font-size:0.3rem;
                }

                & >.g-progress{
                    position:absolute;
                    top:0;
                    left:0;

                }


            }
        }

        & >.g-audio_wrap{
            position:absolute;
            z-index:-9999;
            opacity:0;
            bottom: -0.6rem;
            
        }

        & >.g-audio_progress{
            height:0.01rem;
            width:0%;
            position:absolute;
            left:0;
            top:0;
            background:green;

        }
    }
</style>
