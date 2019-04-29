<template>
    <div>
        <div class="g-search_header">
            <div class="g-search_input">
                <i class="el-icon-search"></i>
                <input type="text" v-model="value" @keyup="searchIn" @keydown.enter="goSearch(value)" placeholder="搜索，歌曲，歌手">
            </div>
        </div>

        <div class="g-search_list_wrap">
            <ul class="g-search_list">
                <li v-for="(item,idx) in searchInputValue" :key="idx">
                    <h3 v-if="item.LableName">{{item.LableName}}</h3>
                    <ul>
                        <li v-for="(child,i) in item.RecordDatas" :key="i" @click="goSearch(child.HintInfo)">
                            <span>{{child.HintInfo}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>  
</template>

<script>
import {axios_getSearch,axios_goSearch} from '@/service/service.js'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentDate: new Date(),
      value:"",
      searchInputValue:null,
      
    }
  },
  methods:{
      async goSearch(val){
            console.log("搜索点击")
            console.log(val)
            let response = await axios_goSearch(val);
            console.log(response)
      },
      async searchIn(){
          // 输入查询
          console.log(this.value)
          let response = await axios_getSearch(this.value);
          console.log(response)
          if( response.status == 200)
          {
              this.searchInputValue = response.data.data;
          }
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
    }
    .g-search_list_wrap{
        width:100%;
        background:#fff;

        & >.g-search_list{
            display:flex;
            flex-direction:column;

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
                    }
                }

            }
        }
    }
</style>
