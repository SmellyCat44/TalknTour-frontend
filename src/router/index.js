import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import RestaurantPage from '@/components/RestaurantPage'
import HotelPage from '@/components/HotelPage'
import Login from '@/components/Login.vue'
import Favorites from '@/components/Favorites.vue'
import MyProfile from '@/components/MyProfile.vue'
import History from '@/components/History.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/restaurantPage', // The path you want to navigate to
      name: 'RestaurantPage', // The name of the route
      component: RestaurantPage // The component that should be loaded when navigating to this route
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/myprofile',
      name: 'MyProfile',
      component: MyProfile
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/hotelPage', // The path you want to navigate to
      name: 'HotelPage', // The name of the route
      component: HotelPage // The component that should be loaded when navigating to this route
    },
  ]
})
