import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import PlayerComponent from '../views/Players.vue'
import PlayerCrudComponent from '../views/PlayerCrud.vue'
import PlayerProfileComponent from '../views/PlayerProfile.vue'
import TeamProfileComponent from '../views/TeamProfile.vue'
import TeamCrudComponent from '../views/TeamCrud.vue'
import MatchsComponent from '../views/Matchs.vue'
import NewMatchComponent from '../views/NewMatch.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '*',
    redirect: '/teams-table'
  },
  {
    path: '/teams-table',
    name: 'Teams',
    component: Home
  },
  {
    path: '/players-table',
    name: 'Players',
    component: PlayerComponent
  },

  {
    path: '/team-crud',
    name: 'TeamsCrud',
    component: TeamCrudComponent
  },

  {
    path: '/player-crud',
    name: 'PlayersCrud',
    component: PlayerCrudComponent
  },

  {
    path: '/player/:id',
    name: 'Playerprofile',
    component: PlayerProfileComponent
  },
  {
    path: '/player',
    name: 'Playerprofile',
    component: PlayerProfileComponent
  },

  {
    path: '/team/:id',
    name: 'Playerprofile',
    component: TeamProfileComponent
  },
  {
    path: '/team',
    name: 'Playerprofile',
    component: TeamProfileComponent
  },

  {
    path: '/matchs',
    name: 'MatchList',
    component: MatchsComponent
  },


  {
    path: '/new-match',
    name: 'NewMatch',
    component: NewMatchComponent
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
