import axios from 'axios'

// const apiUrl = "http://119.29.67.165/"

// export const getSearch = () => axios.get("/ttgy/data/01-index/lunbo.php");
export const axios_getSearch = (fd) => axios.get("http://searchtip.kugou.com/getSearchTip?MusicTipCount=5&keyword="+fd);
export const axios_goSearch = (fd) => axios.get("/api/v3/search/song?format=json&keyword=%E7%8E%8B%E5%8A%9B%E5%AE%8F&page=1&pagesize=20&showtype=1");