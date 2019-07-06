<template>
  <div class="container">
      <div class="g-footer_wrap" >
            <div class="g-footer_left" @click.stop="$router.push('/musicDetails')">
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
                <audio :src="playData && playData.url" :autoplay="isPlaying && 'autoplay'" :loop="playType == 'one' && 'loop'" controls ref="myAudio" 
                    @play="onplay"
                    @pause="onpause"
                    @ended="onended"
                    @loadedmetadata="onloadedmetadata"
                    @error="onerror"
                    @timeupdate="ontimeupdate"
                ></audio>
            </div>
            
            <div class="g-audio_progress" :style="{width:timing + '%'}"></div>

          
      </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {axios_getLrc} from '@/service/service'

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
      ...mapState(['playData','isPlaying','timing','duration','setCurrentTime','lrcData','lineno','isPlayErr','playType','playIndex'])
  },
  methods:{
      ...mapMutations(['IS_PLAYING','TIMING','DURATION','LRC_DATA','LINENO','IS_PLAY_ERR','PLAY_INDEX']),
      play(){
          // 播放/暂停
          let audio = this.$refs.myAudio;
          audio.ended && this.TIMING(this.deg = 0);
          this.IS_PLAYING(!this.isPlaying);
      },
      onplay:function(){
          console.log("开始播放")
          // 开始播放
          this.drageMove();
          this.degRotate();
          this.lrcData.length && this.setLine();
      },
      onpause:function(){
          // 暂停播放
          console.log("暂停")
          this.pauseTimer();
      },
      onended:function(){
          console.log("播放结束");
          this.IS_PLAYING(false);
          let idx = this.playType == 'list' ? this.playIndex + 1 : this.playIndex;
          this.PLAY_INDEX({controls:true,msg:idx});


      },
      onerror:function(){
          //console.log("错误发生： error")
          this.IS_PLAY_ERR(true);
          this.$notify({
                title: '温馨提示',
                message: '该歌曲目前无法播放，请切换下一首',
                type: 'warning'
          });
      },
      onloadedmetadata:function(){
          //当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件。
          let audio = this.$refs.myAudio;
          this.DURATION(Math.floor(audio.duration));
          console.log("总是长：")
          console.log(audio.duration)
      },
      ontimeupdate:function(){
          // 歌曲正在播放时
          // 设置当前行歌词
          if(this.lrcData.length)
          {
              let s = Number(this.lrcData[this.lineno].time) || 0;
              let audio = this.$refs.myAudio;

              if(s <= audio.currentTime && audio.currentTime >= Number(this.lrcData[this.lineno+1].time || 0) )
              {
                  this.LINENO(this.lineno + 1);
                  console.log('s:'+s);
                  console.log('下一行lineno:'+Number(this.lrcData[this.lineno].time || 0))
                  console.log("下一行了："+this.lineno);
              }


          }
      },
      drageMove:function(){
          // 播放进度
          let audio = this.$refs.myAudio,
              _this = this;
          clearInterval(this.timer);
          this.timer = setInterval(function(){
              _this.TIMING(Math.ceil(audio.currentTime)  / Math.floor(audio.duration) * 100);
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
      },
      async getLrc(){
          // 获取歌词
          if(this.playData.id == '')
          {
              return;
          }
          let response = await axios_getLrc(this.playData.lrc);
          if(response.status == 200)
          {
              let data = response.data,
                  reg = /\]/,
                  arr = data.split(/\n/),
                  lrcList = [];

            console.log("获取歌词")
            console.log(data)

              for(let i=0;i<arr.length;i++)
              {
                  let item = arr[i].split(reg),
                      t = item[0].slice(1),
                    obj = {
                        text: item[1],
                        time: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(2)
                    };

                  lrcList[i] = obj;

              }
              this.LRC_DATA(lrcList);
            console.log(lrcList)
          }
      },
      setLine(){
          // 每当开始播放时设置歌词当前行
          let audio = this.$refs.myAudio;
          console.log('lrcLength:'+ this.lrcData.length)
          
          for(let i=0;i<this.lrcData.length;i++)
          {
              if(audio.currentTime < this.lrcData[i].time){
                  let idx = i <=0 ? 0 : i-1;
                  console.log("当前播放时间："+audio.currentTime);
                  this.LINENO(idx);
                  console.log("设置当前行："+idx);
                  break;
              }
          }
      },


  },
  watch:{
      isPlaying:function(msg){
          console.log("播放状态改变")
          console.log(msg);
          if(this.isPlayErr){
              return this.onerror();
          }
          let audio = this.$refs.myAudio;
          msg ?  audio.play() : audio.pause();
      },
      playData:function(msg){
          this.getLrc();
      },
      setCurrentTime:function(msg){
          // 设置播放时间
          if(this.isPlayErr){
              return this.onerror();
          }
          let audio = this.$refs.myAudio;
          audio.currentTime = msg;
          this.IS_PLAYING(true);
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
        border-top:1px solid #eee;
        padding:0 0.15rem;
        background:#fff;

        & .g-footer_left{
            display:flex;
            align-items:center;
            width:100%;

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
