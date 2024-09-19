require('./bootstrap');

window.Vue = require('vue').default;

Vue.component('Home', require('./components/pages/Home.vue').default);

const app = new Vue({
    el: '#app',
});
