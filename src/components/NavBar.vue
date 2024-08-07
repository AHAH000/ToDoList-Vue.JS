<!-- src/components/NavBar.vue -->
<template>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/to-do-list">To Do List</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'NavBar'
  });
  </script>
  
  <style scoped>
  nav {
    background-color: black;
    padding: 1em;
  }
  
  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin: 0;
  }
  
  a {
    color: green;
    text-decoration: none;
    font-weight: bold;
  }
  
  a:hover {
    color: limegreen;
    text-decoration: underline;
  }
  </style>
  