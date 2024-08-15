<script setup lang="ts">
import { isAuthenticated } from '@/auth';
import { ref,onMounted } from 'vue';
import Notification from '@/components/Notification.vue';

const showNotification = ref(false);
const notificationMessage = ref('');
onMounted(() => {
    if(isAuthenticated.value){
      
    }else{
        showNotification.value=true;
        notificationMessage.value="Please Login First ";
    }
});

</script>


<template>

  <div class="about">
    <h1>This is an about page</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolorum exercitationem ex odit sunt culpa voluptatum architecto a, quasi aspernatur quo, enim eum possimus ipsam atque eaque itaque? In, quasi!</p>
  </div>
</template>

<style scoped>
.about {
  background-color: #121212; /* Set a background color, adjust as needed */
  color: white; /* Ensure text color is white if desired */
  padding: 2em; /* Add padding to give space around the content */
}
.about h1{
  color: white;
  font-family: 'Times New Roman', Times, serif;
  font-size: 3rem;
}
.about p{
  color: white;
  font-size: 1.5rem;
}
</style>
