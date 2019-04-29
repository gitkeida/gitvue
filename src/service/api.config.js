const isPro = Object.is(process.env.NODE_ENV, 'production');
const baseUrl = isPro ? "http://mobilecdn.kugou.com/" : "api/"
export default baseUrl