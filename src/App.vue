<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="container">
    <nav>
      <ul>
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
    </nav>
    <RouterView/>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  
}

nav {
  background-color: black;
  width: 100vw; /* Full viewport width */
  position: fixed; /* Fix the position at the top */
  top: 0;
  left: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}

li {
  margin: 1em 1em 1em 1em; /* Adds space below each <li> item */
    display: flex;
  
}

a {
  color: green;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5em 1em; /* Add padding to make the border more visible */
}

a:hover {
  color: limegreen;
  text-decoration: none;
}

li.active a {
  background-color: rgb(10, 30, 20);
  color:limegreen; /* Change to your desired highlight color */
  border: 2px inset rgba(21, 187, 104, 0.3); /* Pressed effect */
  
}
</style>