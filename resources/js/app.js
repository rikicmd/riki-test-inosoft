require('./bootstrap');

import { store } from './store'

window.Vue = require('vue').default;

Vue.component('Home', require('./components/pages/Home.vue').default);

const app = new Vue({
    store,
    el: '#app',
});
