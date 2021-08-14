import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import firebase from 'firebase'
Vue.config.productionTip = false

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyANfVXfVoReWLRPRgNXSYGirBVjZfYoOMw",
    authDomain: "shopping-24132.firebaseapp.com",
    projectId: "shopping-24132",
    storageBucket: "shopping-24132.appspot.com",
    messagingSenderId: "422358014226",
    appId: "1:422358014226:web:5a52c52150d383a831fbcb",
    measurementId: "G-Q0X0J1XXJZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
