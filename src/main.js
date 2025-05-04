// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Make sure this path is correct
import store from './store'
import './style.css'
import './main.css'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')