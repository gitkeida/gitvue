<template>
    <div>
        <div class="g-search_header">
            <div class="g-search_input">
                <i class="el-icon-search"></i>
                <input type="text" v-model="value" @keyup="searchIn" @keydown.enter="goSearch(value)" placeholder="搜索，歌曲，歌手">
            </div>
            <div class="g-search_help_wrap" v-show="showSearchHelp">
                <ul>
                    <li v-for="(item,idx) in searchHelpValue" :key="idx">
                        <h3 v-if="item.RecordDatas.length && item.LableName">{{item.LableName}}</h3>
                        <ul>
                            <li v-for="(child,i) in item.RecordDatas" :key="i" @click="goSearch(child.HintInfo)">
                                <span @click="searchHelpClick(child.HintInfo)">{{child.HintInfo}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <div class="g-search_list_wrap" v-loading="loading" ref='touch_list' >
            <ul class="g-search_list" @touchstart='listStart' >
                <li v-for="(item,idx) in newList" :key="idx" @click="goPlay(idx)">
                    <div>
                        <div class="g-text">
                            <p>{{item.name}}</p>
                            <h5>{{item.singer}}</h5>
                        </div>
                        <div class="g-icon">
                            <i class="el-icon-caret-right"></i>
                        </div>
                    </div>
                    
                </li>
            </ul>
        </div>
        <div class='g-loading_load' v-show='showLoad'>
            <p>加载中<i class='el-icon-loading'></i></p>
        </div>
    </div>  
</template>

<script>
import {axios_getSearch,axios_goSearch} from '@/service/service.js'
import {mapState,mapMutations} from 'vuex'

export default {
  name: 'search',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentDate: new Date(),
      value:"",
      searchHelpValue:null,
      showSearchHelp:false,
      searchListValue:[],
      loading:false,
      newList: [],
      count: 15,
      showLoad: false,
    }
  },
  computed:{
      ...mapState(['playData','audioList'])
  },
  methods:{
      ...mapMutations(['PLAY_DATA','AUDIO_LIST','PLAY_INDEX']),
      async goSearch(val){
            console.log("搜索点击")
            console.log(val)
            this.showSearchHelp = false;
            this.loading = true;
            let response = await axios_goSearch(val);
            console.log(response)
            if( response.status == 200)
            {
                this.searchListValue = response.data.data;
                this.loading = false;
                this.loadList();
            }
      },
      async searchIn(e){
          if(e.keyCode == 13){
              return;
          }
          // 输入查询
          console.log(this.value)
          let response = await axios_getSearch(this.value);
          if( response.status == 200)
          {
              this.searchHelpValue = response.data.data;
              this.showSearchHelp = true;
          }
          else
          {
              this.showSearchHelp = false;
          }
      },
      searchHelpClick(msg){
          this.value = msg;
          this.showSearchHelp = false;
          this.goSearch(msg);
      },
      goPlay(idx){
          console.log("发送数据");
          this.audioList != this.searchListValue && this.AUDIO_LIST(this.searchListValue);
          this.playData != this.audioList[idx] && this.PLAY_DATA(this.audioList[idx]);
          this.PLAY_INDEX({msg:idx});
          this.$router.push("/musicDetails");

      },
      loadList(){
          this.newList = this.searchListValue.slice(0,this.count);
      },
      listStart(e){
          var scrollTop = document.body.scrollTop || document.documentElement.scrollTop,    // 益处高度
              height = this.$refs.touch_list.scrollHeight,                                  // 容器高度
              winHeight = window.screen.height;                                             // 屏幕可见高度

            console.log(document.body.clientHeight);
            console.log('屏幕高度：'+winHeight)
            console.log('容器高度：'+height)
            console.log('益出高度：'+scrollTop)

      }
  },
  mounted:function(){
      let This = this;
      window.onscroll = function(){
          let top = document.body.scrollTop || document.documentElement.scrollTop,
              docHeight = document.body.clientHeight,
              winHeight = window.screen.height;

              if(top + winHeight >= docHeight)
              {
                  if (This.newList.length >= This.searchListValue.length) return;
                  // 到达底部
                  This.showLoad = true;
                  setTimeout(()=>{
                      This.count += 15;
                      This.loadList();
                      This.showLoad = false;

                  },1500)
              }
              else{
              }
              
        
          console.log(top);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .g-search_header{
        width:100%;
        height:0.6rem;
        background:#fff;
        display:flex;
        flex-direction:column;
        align-items:center;
        padding:0.15rem 0.1rem;
        border-bottom:1px solid #eee;
        position:relative;

        & >.g-search_input{
            height:100%;
            width:100%;
            padding:0 0.3rem;
            background:#ebecec;
            border-radius:0.3rem;
            position:relative;

            & >i{
                position:absolute;
                line-height:0.3rem;
                color:#ccc;
                left:0.08rem;
                margin:auto;
            }

            & >input{
                width:100%;
                height:100%;
                color:#333;
                border:0;
                outline:none;
                background:#ebecec;

                &::-webkit-input-placeholder{
                    color:#ccc;
                }
            }
        }

        & >.g-search_help_wrap{
            position:absolute;
            background:#fff;
            width:90%;
            height:auto;
            max-height:3rem;
            overflow:auto;
            left:0.15rem;
            top:105%;
            box-shadow: 0 0 15px 0 #ccc;

            & >ul{
                display:flex;
                flex-direction:column;
                background:#fff;

                & >li{
                        &>h3{
                            padding-left:0.15rem;
                            height:0.45rem;
                            line-height:0.55rem;
                            font-size:16px;
                        }

                        & li{
                            height:0.45rem;
                            line-height:0.45rem;
                            padding-left:0.15rem;

                            & >span{
                                display:inline-block;
                                width:100%;
                                border-bottom:1px solid #eee;
                                white-space: nowrap;
                            }
                        }

                }
            }
        }
    }
    .g-search_list_wrap{
        width:100%;
        background:#fff;

        & >.g-search_list{
            display:flex;
            flex-direction:column;

            & >li{
                padding:0.08rem 0.15rem 0;
                
                & >div{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    width:100%;
                    padding-bottom:0.08rem;
                    border-bottom:1px solid #eee;
                    overflow:hidden;
                    text-overflow:ellipsis;


                    & >.g-icon{
                        width:0.22rem;
                        height:100%;
                        vertical-align: middle;
                        border-radius:50%;

                        & >i{
                            width:0.22rem;
                            height:0.22rem;
                            text-align:center;
                            line-height:0.2rem;
                            color:#aaa;
                            border-radius:50%;
                            border:1px solid #aaa;
                            font-size:0.14rem;

                        }
                    }
                }

                & p{
                    font-size:0.15rem;
                    color:#333;
                    white-space: nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    max-width:3.1rem;

                }

                & h5{
                    font-size:0.12rem;
                    font-weight:normal;
                    color:#507daf;
                    white-space: nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    max-width:3.1rem;

                }
            }
        }
    }
    .g-loading_load{
        text-align:center;
        padding:10px 0;
        transition:all .2s;
    }
</style>
