import {
    AUDIO_DATA,
    PLAY_DATA,
    IS_PLAYING,
    TIMING
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
    // 播放进度
    [TIMING](state,msg){
        state.timing = msg;
    },
    // 歌曲时长
    DURATION(state,msg){
        state.duration = msg;
    },
    // 设置当前播放时间
    SET_CURRENT_TIME(state,msg){
        state.setCurrentTime = msg;
    }

}