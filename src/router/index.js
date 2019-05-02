import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home/home'
import Search from '@/pages/search/search'
import MusicDetails from '@/pages/musicDetails/musicDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/search',
      component: Search
    },
    {
      path:'/musicDetails',
      component: MusicDetails
    }
  ]
})
