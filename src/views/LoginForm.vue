<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import Notification from '@/components/Notification.vue';
const VITE_API_URL = 'https://todo.nafistech.com/api';
import { type ToDoListApi, API_DATA_UPLOAD } from '../api/ToDoListApi';
const emailInput = ref('');
const passwordInput = ref('');
const notificationMessage = ref('');
const showNotification = ref(false);
const token = localStorage.getItem('token');
    // axios.default.headers.commom['Authorization'] =`Bearer $(token)`
const validateEmail = (email: string): boolean => {
  // Basic email format validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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

  try {
    const response = await axios.post(`${VITE_API_URL}/login`, {
      email: emailInput.value,
      password: passwordInput.value,
    });

    // Handle successful login (e.g., store token, redirect)
    console.log('Login successful:', response.data);
  } catch (error) {
    // Handle error (e.g., show error message)
    notificationMessage.value = 'Login failed. Please check your credentials.';
    showNotification.value = true;
  }
}
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
            <input type="password" v-model="passwordInput"/>
            <span></span>
            <label>Password</label>
          </div>
          <button type="submit" class="LogBtn">Login In</button>
          <div class="RouteRegister">
            Don’t have an account <router-link to="/RegisterView">Register here</router-link>
          </div>
        </form>
      </div>
  
      <div class="sideInfo">
        <img src="../assets/images/ToDoListImgUD.png" alt="To-Do List Benefits" class="sideInfo-image" />
        <div class="benefits-list">
          <h2> Why To-Do-List</h2>
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
  background: black; /* Set body background to black */
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
  background: black; /* Set form background to black */
  border-radius: 10px; /* Rounded corners for the form container */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.7); /* Outer and inner shadow for depth */
  border: 3px solid rgba(255, 255, 255, 0.3); /* Light border with some opacity */
  padding: 20px;
  max-width: 600px;
  width: 100%;
}

.center h1 {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid white; /* Change border color to white */
  color: white; /* Set text color to white */
}

.center form {
  padding: 0 40px;
  box-sizing: border-box;
}

form .txt_field {
  position: relative;
  border-bottom: 2px solid white; /* Change input underline color to white */
  margin: 30px 0;
}

.txt_field input {
  width: 100%;
  padding: 10px 5px; /* Added padding to input field */
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  color: white; /* Set input text color to white */
  outline: none;
}

.txt_field label {
  position: absolute;
  top: 10px; /* Added space between label and input field */
  left: 5px;
  color: white; /* Set label text color to white */
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
  background: white; /* Change underline color to white */
  transition: 0.5s;
}

.txt_field input:focus ~ label,
.txt_field input:valid ~ label {
  top: -5px;
  color: white; /* Change focused label color to white */
}

.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before {
  width: 100%;
}

.pass {
  margin: -5px 0 20px 5px;
  color: white; /* Change password text color to white */
  cursor: pointer;
}

.pass:hover {
  text-decoration: underline;
}

.LogBtn {
  width: 100%;
  height: 50px;
  background: green; /* Set button background to green */
  border-radius: 25px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  transition: 0.5s;
  border: none;
  color: white; /* Set button text color to white */
}

.LogBtn:hover {
  background: darkgreen; /* Darken button background on hover */
}

.RouteRegister {
  margin-top: 20px; /* Add some space above the text */
  color: white;
  margin-bottom: 50px;
}

.RouteRegister a {
  color: green; /* Set the link color to green */
  text-decoration: none; /* Remove underline from the link */
}

.RouteRegister a:hover {
  text-decoration: underline; /* Add underline on hover */
}

.sideInfo {
  background: black; /* Set form background to black */
  border-radius: 50px; /* Rounded corners for the form container */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.7); /* Outer and inner shadow for depth */
  border: 3px solid rgba(255, 255, 255, 0.3); /* Light border with some opacity */
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
    transition: color 0.3s, background-color 0.3s; /* Smooth transition for hover effects */
    padding: 5px; /* Add some padding for better spacing */
    border-radius: 5px; /* Rounded corners for the hover effect */
  }
  
  .benefits-list li:hover {
    color: green; /* Change text color on hover */
    background-color: rgba(20, 163, 82, 0.1); /* Light green background on hover */
  }
</style>
