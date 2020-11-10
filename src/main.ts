import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'jquery';
import 'popper.js';
import 'bootstrap';
import Navbar from './components/Navbar.vue';
import PageTitle from './components/PageTitle.vue';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false

Vue.component('navbar', Navbar);
Vue.component('page-title', PageTitle);

Vue.use(Vuelidate);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
