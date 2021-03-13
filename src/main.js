import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueNotification from "@kugatsu/vuenotification";

Vue.use(VueNotification, {
  timer: 5,
  position: "topRight",
  title: "Vue notification",
  error: {
    background: "#F56565",
    color: "white"
  },
  success: {
    background: "#38A169",
    color: "white"
  },
  warning: {
    background: "#ED8936",
    color: "white"
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
