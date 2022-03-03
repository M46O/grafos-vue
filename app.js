/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.prototype.$echarts = echarts;

const app = new Vue({
    el: '#app',

    components: {
        'navbar-component': httpVueLoader('./components/NavbarComponent.vue'),
        'dashboard-component': httpVueLoader('./components/DashboardComponent.vue'),
    },
});