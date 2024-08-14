<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import Notification from '@/components/Notification.vue';
import type { Login } from '@/api/ToDoListApi';
import { useRouter } from 'vue-router';
import router from '@/router';
import HomeView from './HomeView.vue';
const VITE_API_URL = 'https://todo.nafistech.com/api';

const emailInput = ref('');
const passwordInput = ref('');
const notificationMessage = ref('');
const showNotification = ref(false);

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const submitLoginForm = async (event: Event) => {
  event.preventDefault(); // Prevent form from submitting normally

  if (!emailInput.value || !passwordInput.value) {
    showNotification.value = true;
    notificationMessage.value = 'Please fill in all fields.';
    return;
  }

  if (!validateEmail(emailInput.value)) {
    showNotification.value = true;
    notificationMessage.value = 'Please enter a valid email address.';
    return;
  }

  const user: Login = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    const response = await axios.post(`${VITE_API_URL}/login`, user);
    const token = response.data.token;

    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      showNotification.value = true;
      notificationMessage.value = 'Login successful!';
      router.push('/')
    } else {
      showNotification.value = true;
      notificationMessage.value = 'Login failed. No token received.';
    }
  } catch (error) {
    showNotification.value = true;
    notificationMessage.value = `Login failed: ${error}`;
  }
};
</script>

<template>
  <Notification v-if="showNotification" :message="notificationMessage" @close="showNotification = false" />

  <div class="container">
    <div class="center">
      <h1>Login</h1>
      <form @submit="submitLoginForm">
        <div class="txt_field">
          <input type="email" v-model="emailInput" />
          <span></span>
          <label>Email</label>
        </div>
        <div class="txt_field">
          <input type="password" v-model="passwordInput" />
          <span></span>
          <label>Password</label>
        </div>
        <button type="submit" class="LogBtn">Login</button>
        <div class="RouteRegister">
          Don’t have an account <router-link to="/RegisterView">Register here</router-link>
        </div>
      </form>
    </div>

    <div class="sideInfo">
      <img src="../assets/images/ToDoListImgUD.png" alt="To-Do List Benefits" class="sideInfo-image" />
      <div class="benefits-list">
        <h2>Why To-Do-List</h2>
        <ul>
          <li>Organize tasks efficiently</li>
          <li>Track your progress</li>
          <li>Stay on top of deadlines</li>
          <li>Boost productivity</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Poppins:wght@400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background: black;
  height: 100vh;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
}

.center {
  background: black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.7);
  border: 3px solid rgba(255, 255, 255, 0.3);
  padding: 20px;
  max-width: 600px;
  width: 100%;
}

.center h1 {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid white;
  color: white;
}

.center form {
  padding: 0 40px;
}

form .txt_field {
  position: relative;
  border-bottom: 2px solid white;
  margin: 30px 0;
}

.txt_field input {
  width: 100%;
  padding: 10px 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  color: white;
  outline: none;
}

.txt_field label {
  position: absolute;
  top: 10px;
  left: 5px;
  color: white;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: 0.5s;
}

.txt_field span::before {
  content: "";
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: white;
  transition: 0.5s;
}

.txt_field input:focus ~ label,
.txt_field input:valid ~ label {
  top: -5px;
  color: white;
}

.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before {
  width: 100%;
}

.LogBtn {
  width: 100%;
  height: 50px;
  background: green;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  transition: 0.5s;
  border: none;
  color: white;
}

.LogBtn:hover {
  background: darkgreen;
}

.RouteRegister {
  margin-top: 20px;
  color: white;
  margin-bottom: 50px;
}

.RouteRegister a {
  color: green;
  text-decoration: none;
}

.RouteRegister a:hover {
  text-decoration: underline;
}

.sideInfo {
  background: black;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.7);
  border: 3px solid rgba(255, 255, 255, 0.3);
  color: white;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  text-align: left;
}

.sideInfo-image {
  width: 100%;
  border-radius: 10px;
}

.benefits-list h2 {
  margin-bottom: 10px;
  color: white;
}

.benefits-list ul {
  list-style-type: disc;
  padding-left: 20px;
}

.benefits-list li {
  margin-bottom: 10px;
  transition: color 0.3s, background-color 0.3s;
  padding: 5px;
  border-radius: 5px;
}

.benefits-list li:hover {
  color: green;
  background-color: rgba(20, 163, 82, 0.1);
}
</style>
