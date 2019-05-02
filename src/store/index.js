import Vue from 'vue'
import Vuex from 'vuex';
import mutations from './mutations'
Vue.use(Vuex);


const state = {
    audioData:{},
    playData:{
        pic: './static/img/39582418617683.jpg',
        name: '沉默是金',
        singer: '张国荣',
        url: './static/mp3/chenmoshijing.mp3'
    },            // 当前播放歌曲
    isPlaying:false,        // 播放状态
    footerTiming:0,         // footer播放进度
}


export default new Vuex.Store({
    state,
    mutations
})