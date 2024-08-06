<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
//import NavBar from './views/NavBar.vue'; // Adjust the path as needed
//import homeView from './views/HomeView.vue'
//import navBar from './views/NavBar.vue'
//const title = ref('My First Vue App :)');
// const handleClick = () => {
//   console.log('clicked');
// };
import ToDoList from './views/TodoListView.vue'
</script>

<template>
<ToDoList></ToDoList>
</template>

<style scoped>

</style>
