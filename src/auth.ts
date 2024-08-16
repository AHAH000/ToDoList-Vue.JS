import axios from 'axios';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export const isAuthenticated = ref<boolean>(false);

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  isAuthenticated.value = true;
}