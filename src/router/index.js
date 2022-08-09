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
  {
    path: '/palletcheck',
    name: 'palletCheck',
    component: PalletCheckView
  },
  // {
  //   path: '/palletcheck/:pallet', props: true, name: 'palletCheck', component: () => import('views/PalletCheckView.vue'),
  //   name: 'palletcheck/',
  //   component: PalletCheckView
  // }
  // { path: '/palletcheck/:palletnumber', props: true, name: 'PalletCheckView', component: () => import('../views/PalletCheckView.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
