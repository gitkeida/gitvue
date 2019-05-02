import {
    AUDIO_DATA,
    PLAY_DATA,
    IS_PLAYING,
    FOOTER_TIMING
} from './mutations-type'

export default {
    // 当前播放音乐
    [PLAY_DATA](state,data){
        state.isPlaying = true;
        state.footerTiming = 0;
        state.playData = data;
    },
    [AUDIO_DATA](state,data){
        state.audioData = data;
    },
    // 播放状态
    [IS_PLAYING](state,boolean){
        state.isPlaying = boolean;
    },
    // FOOTER 播放进度
    [FOOTER_TIMING](state,msg){
        state.footerTiming = msg;
    }

}