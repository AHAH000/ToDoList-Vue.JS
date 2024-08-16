import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
// FontAwesome 
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue'
import router from './router'
import axios from 'axios';
import { isAuthenticated } from './auth';

// Add icons to the library
library.add(faPen, faTrash);
export { FontAwesomeIcon };

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);

// Check for token in localStorage
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  isAuthenticated.value = true; // Set the auth state to true
}

app.mount('#app')
