import Vue from 'vue'
import VueRouter from 'vue-router'
import PalletsSelectView from '../views/PalletsSelectView.vue'
import PalletCheckView from '../views/PalletCheckView.vue'
import PalletProductsView from '../views/PalletProductsView.vue'
import ConflictView from '../views/ConflictView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'palletsSelect',
    component: PalletsSelectView
  },
  { path: '/palletcheck/:palletId', props: true, name: 'palletCheck', component: PalletCheckView },
  { path: '/palletcheck/palletproductsview/:palletId', props: true, name: 'palletProductsView', component: PalletProductsView },
  { path: '/conflict/:palletId', props: true, name: 'ConflictView', component: ConflictView },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
