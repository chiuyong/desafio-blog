import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store/store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
const fb = require('./config/firebaseConfig')

Vue.config.productionTip = false

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            vuetify,
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})

/*
new Vue({
  el: '#app',
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
*/