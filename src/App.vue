<script setup lang="ts">
import { useRoute } from 'vue-router';
import NavBar from "./components/NavBar.vue"
const route = useRoute();
</script>

<template>
  <div class="container">
    <NavBar/>
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


</style>