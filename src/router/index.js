import Vue from 'vue'
import VueRouter from 'vue-router'
import PalletsSelectView from '../views/PalletsSelectView.vue'
import PalletCheckView from '../views/PalletCheckView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'palletsSelect',
    component: PalletsSelectView
  },
  { path: '/palletcheck/:palletId', props: true, name: 'palletCheck', component: PalletCheckView },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
