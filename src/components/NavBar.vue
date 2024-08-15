<template>
  <nav>
    <ul class="left">
      <li :class="{ active: route.path === '/' }">
        <router-link to="/">Home</router-link>
      </li>
      <li :class="{ active: route.path === '/about' }">
        <router-link to="/about">About</router-link>
      </li>
      <li :class="{ active: route.path === '/to-do-list' }">
        <router-link to="/to-do-list">To Do List</router-link>
      </li>
    </ul>
    <ul class="right">
      <li v-if="isAuth" :class="{ active: route.path === '/LoginForm' }">
        <button @click="logout" class="logout-btn">
          <i class="fa fa-sign-out" aria-hidden="true"></i> Log Out
        </button>
      </li>
      <li v-else :class="{ active: route.path === '/LoginForm' }">
        <router-link to="/LoginForm">
          <i class="fa fa-sign-in" aria-hidden="true"></i> Log In
        </router-link>
      </li>
      <li v-if="!isAuth" :class="{ active: route.path === '/RegisterView' }">
        <router-link to="/RegisterView">
          <i class="fa fa-user-plus" aria-hidden="true"></i> Register
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { isAuthenticated } from '@/auth';  
import router from '@/router';

const route = useRoute();
const isAuth = ref(isAuthenticated.value);

watch(() => isAuthenticated.value, (newVal) => {
  isAuth.value = newVal;
});

const logout = () => {
  localStorage.removeItem('token');
  isAuthenticated.value = false;
  router.push('/LoginForm');
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

nav {
  background: linear-gradient(-45deg, #000, #131413, #000, #030, #000);
  background-size: 400% 400%;
  animation: myGradient 12s infinite;
  width: 100vw;
  top: 0;
  left: 0;
  position: fixed;
  padding: 0 2em; /* Increased padding for more space */
  box-shadow: 3px 3px 20px #031403;
  border-radius: 0; /* Removed border-radius for a cleaner edge */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px; /* Added height to maintain vertical spacing */
  
}

@keyframes myGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}

ul.left {
  display: flex;
  margin: 0;
}

ul.right {
  display: flex;
  margin: 0;
  margin-left: auto;
}

li {
  margin: 0 1.5em; /* Increased space between items */
  display: flex;
  align-items: center;
}

a, button {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5em 1em;
  display: flex;
  align-items: center;
  transition: color 0.3s;
}

a:hover, button:hover {
  color: #00FF00; /* Green color on hover */
}

li.active a, li.active button {
  background-color: #003300; /* Dark green background for active items */
  color: #00FF00; /* Green text color for active items */
  border: 2px inset rgba(0, 255, 0, 0.3);
}

.logout-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.2em;
  display: flex;
  align-items: center;
}

.logout-btn:hover {
  color: #00FF00; /* Green color on hover */
}

.material-icons {
  font-size: 1.5em;
  margin-right: 0.5em;
}

.dropdown {
  background: #000000;
  width: 150px;
  height: auto;
  color: #fff;
  font-family: verdana;
  padding: 20px;
  border-radius: 5px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50px;
  right: 0;
  display: none;
  background-size: 400% 400%;
  background-image: linear-gradient(-45deg, #003300, #006600, #003300, #000000);
  animation: myLineargradient 6s infinite;
  box-shadow: 2px 3px 20px #003300;
}

.dropdown.active {
  display: block;
}

@keyframes myLineargradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.drop1, .drop2, .drop3, .drop4 {
  cursor: pointer;
  text-shadow: 1px 2px 18px #fff;
  transition: 2s;
}

@media(max-width: 767px) {
  nav {
    padding: 0;
    height: auto; /* Adjust height for mobile */
  }
  
  ul {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .dropdown {
    width: 100%;
    position: static;
    top: auto;
    right: auto;
  }
}
</style>
