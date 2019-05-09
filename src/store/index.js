import Vue from 'vue'
import Vuex from 'vuex';
import mutations from './mutations'
Vue.use(Vuex);


const state = {
    audioData:{},       
    playData:{
        id: '',
        lrc: '',
        time: '251',
        pic: './static/img/39582418617683.jpg',
        name: '沉默是金',
        singer: '张国荣',
        url: './static/mp3/chenmoshijing.mp3'
    },            // 当前播放歌曲
    isPlaying:false,        // 播放状态
    duration:0,             // 歌曲时长
    timing:0,               // 播放进度 0%  
    currentTime:null,       // 当前播放时间
    setCurrentTime:null,    // 设置当前播放时间
    lrcData:[],             // 歌词
    lineno:0,               // 歌词当前行
}


export default new Vuex.Store({
    state,
    mutations
})