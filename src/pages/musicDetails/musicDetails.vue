<template>
    <div>
        <transition name="fold-left">
        <div class="g-details_wrap">
            <div class="g-CD_wrap_bg"></div>

            <div class="g-content_wrap">

                <header>
                    <div class="g-details_header">
                        <div class="g-details_back">
                            <i class="el-icon-back" @click="$router.back()"></i>
                        </div>
                        <div class="g-details_title">
                            <h5>{{playData.name}}</h5>
                            <p>{{playData.singer}}></p>
                        </div>
                    </div>
                </header>

                <div class="g-content" @click="showLrc = !showLrc">
                    <div class="g-CD_wrap" v-show="!showLrc">
                        <div class="g-CD_bg">
                            <div class="g-CD_img" :style="{transform:'rotate('+ deg +'deg)'}">
                                <img :src="playData.pic" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="g-lyric_wrap" v-show="showLrc">
                        <div class="g-lyric_content">
                            <ul class="g-lrc_list" ref="lrcList" :style="{top:'calc('+ lineno * liHeight * -1 + 'px + 50%)'}">
                                <li v-for="(item,i) in lrcData" :key="i" :class="{active:i==lineno}" >{{item.text}}</li>
                                <li v-if="!lrcData.length">暂无歌词信息</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="g-details_footer">

                    <div class="g-bar_wrap">
                        <div><span class="g-dot_start">{{startCurrentTime | totalTime }}</span></div>
                        <Bar></Bar>
                        <div><span class="g-dot_end">{{duration | totalTime}}</span></div>
                    </div>

                    <div class="g-menu_wrap">
                        <div>
                            <i :class="typeIcon" @click="typeTrigger"></i>                            
                        </div>
                        <div>
                            <i class="el-icon-d-arrow-left" @click="trigger('prev')"></i>
                        </div>
                        <div>
                            <i style="font-size:0.4rem" :class="isPlaying ? 'el-icon-video-pause' : 'el-icon-video-play' " @click="play"></i>
                        </div>
                        <div>
                            <i class="el-icon-d-arrow-right" @click="trigger('next')"></i>
                        </div>
                        <div>
                            <i class="el-icon-s-operation" ></i>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        </transition>
    </div>  
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Bar from '@/components/progressBar'
import {axios_getLrc} from '@/service/service'

export default {
  name: 'musicDetails',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showLrc: false,
      deg: 0,
      degTimer: null,
      liHeight: 40,
      typeIconList: {
          list: {icon:'el-icon-refresh',next:'one'},
          one: {icon:'el-icon-refresh-left',next:'ram'},
          ram: {icon:'el-icon-service',next:'list'}
      }
    }
  },
  filters:{
      totalTime:function(msg){
          msg = parseInt(msg);
          if(!msg)
          {
              return '00:00';
          }
          var m,s;
          m = Math.floor(msg/60);
          s = Math.floor(msg%60);
          m < 10 && (m = '0' + m);
          s < 10 && (s = '0' + s);
          return m + ':' + s;
      },
      
  },
  computed:{
      ...mapState(['playData','isPlaying','timing','duration','lrcData','lineno','audioList','isPlayErr','playIndex','playType']),
      startCurrentTime:function(){
            //let time_s = parseInt(this.timing * 0.01 * this.duration),
            //     m = Math.floor(time_s/60),
            //     s = Math.floor(time_s%60);
            //     m < 10 && (m = '0' + m);
            //     s < 10 && (s = '0' + s);
            //   return m + ':' + s;      
            return this.timing * 0.01 * this.duration;
      },
      typeIcon:function(){
          return this.typeIconList[this.playType].icon;
      }
  },
  components:{Bar},
  methods:{
      ...mapMutations(['IS_PLAYING','TIMING','LRC_DATA','PLAY_DATA','PLAY_INDEX','PLAY_TYPE']),
      play(){
          this.timing == 100 && this.TIMING(0);
          this.IS_PLAYING(!this.isPlaying);
      },
      degRotate(){
          // 唱碟旋转
          let _this = this;
          clearInterval(this.degTimer);
          this.degTimer = setInterval(function(){
               _this.deg += 0.3;
          },30)
      },
      pauseTimer(){
          if(this.degTimer != null)
          {
              clearInterval(this.degTimer);
              this.degTimer = null;
          }
      },
      trigger(type){
          // 切换歌曲
        //   let idx = 0,
        //       length = this.audioList.length;
        //   for(let i=0;i<length;i++)
        //   {
        //       if(this.playData == this.audioList[i])
        //       {
        //           idx = type == 'next' ? i+1 : i-1;
        //           idx < 0 && (idx = length - 1);
        //           idx >= length && (idx = 0);
        //           this.PLAY_DATA(this.audioList[idx]);
        //           break;
        //       }
        //   }
        let idx = type == 'next' ? this.playIndex + 1 : this.playIndex - 1;
        this.PLAY_INDEX({controls:true,msg:idx});

      },
      typeTrigger(){
          // 切换播放类型
            this.PLAY_TYPE(this.typeIconList[this.playType].next);
      },



  },
  mounted:function(){
      !this.isPlayErr && this.isPlaying ? this.degRotate() : this.pauseTimer();
      console.log("音乐信息")
      console.log(this.playData);
  },
  watch:{
      isPlaying:function(msg){
           (!this.isPlayErr && msg) ? this.degRotate() : this.pauseTimer();
      },
      isPlayErr:function(msg){
          msg ? this.pauseTimer() : this.degRotate();
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .g-position{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin:0;
        height:100%;
        width:100%;
        overflow:hidden;
    }
    .g-details_wrap{
        .g-position;
        z-index:99;
        color:#fff;
        background-color:#7f7f7f;
        animation:myopacity .3s forwards;

        &>.g-CD_wrap_bg{
            .g-position;
            background:url(../../../static/img/17596584090996716.jpg);
            background-position: 50%;
            background-repeat: no-repeat;
            background-size: auto 100%;
            transform: scale(1.5);
            transform-origin: center top;
            z-index: -1;


            &::after{
                content:'';
                .g-position;
                background:rgba(0,0,0,0.5);
            }
        }

        &>.g-content_wrap{
            .g-position;
        }

        & .g-details_header{
            display:flex;
            height:0.45rem;

            &>.g-details_back{
                width:0.5rem;
                text-align:center;

                &>i{
                    font-size:0.24rem;
                    line-height:0.45rem;

                }
            }

            &>.g-details_title{
                padding-top:5px;
                & >h5{
                    font-size:0.15rem;
                    margin-bottom:0.03rem;
                    font-weight:normal;
                }
                & >p{
                    font-size:0.12rem;
                    color:#ccc;
                }
            }
        }

        & .g-content{
            position:relative;
            overflow:hidden;
            display:flex;
            height:100%;

            &>.g-CD_wrap{
                padding-top:0.6rem;
                width:100%;
                min-height:3rem;
                min-width:100%;
                display:flex;
                justify-content:center;
                animation:opacity .4s forwards;

                &>.g-CD_bg{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    width:3rem;
                    height:3rem;
                    border-radius:50%;
                    background:url(../../../static/img/disc-ip6.png) no-repeat;
                    background-size:3rem 3rem;
                    position:relative;

                    &:after{
                        content:'';
                        background:url(../../../static/img/disc_light-ip6.png) no-repeat;
                        background-size:3rem 3rem;
                        width: 3rem;
                        height: 3rem;
                        display: inline-block;
                        position:absolute;
                        top:0;
                        left:0;
                    }

                    &>.g-CD_img{
                        display:inline-block;
                        width:1.85rem;
                        height:1.85rem;
                        border-radius:50%;
                        overflow:hidden;

                        &>img{
                            width:100%;
                            height:100%;
                        }

                    }
                }
            }

            &>.g-lyric_wrap{
                // border:1px solid red;
                width:100%;
                text-align:center;
                padding:0.2rem 0.35rem;
                animation:opacity .4s forwards;

                &>.g-lyric_content{
                    position:relative;
                    // border:1px solid orange;
                    height:4rem;
                    overflow:hidden;

                    &>.g-lrc_list{
                        position:absolute;
                        display:flex;
                        flex-direction: column;
                        width:100%;
                        // border:1px solid green;
                        top:50%;
                        align-items:center;
                        justify-content: center;
                        transition:top .3s;

                        &>li{
                            width:100%;
                            height:0.4rem;
                            color:rgba(255,255,255,0.5);
                            font-size:0.14rem;

                            &.active{
                                color:#fff;
                            }
                        }
                    }
                }
            }
        }

        & .g-details_footer{
            position:absolute;
            bottom:0;
            width:100%;

            &>.g-bar_wrap{
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding:0 0.2rem;

                & span{
                    display:inline-block;
                    font-size:0.12rem;
                    height:100%;
                    line-height:2;

                    &.g-dot_end{
                        color:rgba(255,255,255,0.6);
                    }
                }
            }

            &>.g-menu_wrap{
                display:flex;
                justify-content:space-around;
                align-items:center;
                padding:0.2rem 5%;

                & i{
                    font-size:0.25rem;
                }

            }
        }
    }

    @keyframes myopacity {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
</style>
