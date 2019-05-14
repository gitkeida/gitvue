import {
    AUDIO_LIST,
    PLAY_DATA,
    IS_PLAYING,
    TIMING
} from './mutations-type'

export default {
    // 当前播放音乐
    [PLAY_DATA](state,data){
        state.isPlayErr = false;
        state.isPlaying = true;
        state.timing = 0;
        state.lineno = 0;
        state.playData = data;
    },
    [AUDIO_LIST](state,data){
        state.audioList = data;
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
    },
    // 歌词
    LRC_DATA(state,msg){
        state.lrcData = msg;
    },
    // 歌词当前行
    LINENO(state,msg){
        state.lineno = msg;
    },
    // 播放错误
    IS_PLAY_ERR(state,msg){
        state.isPlayErr = msg;
    },
    // 当前播放歌曲序号
    PLAY_INDEX(state,data){

        if(data.controls)
        {
            switch(state.playType)
            {

                case 'ram':
                    break;
                
                default:
                    let length = state.audioList.length,
                        idx = data.msg;
                    idx < 0 && (idx = length - 1);
                    idx >= length && (idx = 0);
                    
                    state.playIndex = idx;
            }
        }
        else{
            state.playIndex = data.msg;

        }
        console.log("设置当前歌曲序号："+state.playIndex);

    },
    // 切换播放类型
    PLAY_TYPE(state,msg){
        state.playType = msg;
    }

}