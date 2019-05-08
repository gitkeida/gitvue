import axios from 'axios'

// const apiUrl = "http://119.29.67.165/"

// export const getSearch = () => axios.get("/ttgy/data/01-index/lunbo.php");
export const axios_getSearch = (fd) => axios.get("http://searchtip.kugou.com/getSearchTip?MusicTipCount=5&keyword="+fd);
export const axios_goSearch = (fd) => axios.get("https://api.itooi.cn/music/kugou/search?key=579621905&s="+fd+"&limit=30&offset=0&type=song");
export const axios_getLrc = (fd) => axios.get("https://api.itooi.cn/music/kugou/lrc?key=579621905&id="+fd);
