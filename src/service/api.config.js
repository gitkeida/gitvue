const isPro = Object.is(process.env.NODE_ENV, 'production');
const baseUrl = isPro ? "https://api.itooi.cn/music/kugou/" : "api/"

export default baseUrl;