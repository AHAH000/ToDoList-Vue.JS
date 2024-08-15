<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { type ToDoListApi } from '../api/ToDoListApi';
import Notification from '../components/Notification.vue';
import { isAuthenticated } from '@/auth';
const VITE_API_URL = 'https://todo.nafistech.com/api';

const tasks = ref<ToDoListApi[]>([]);
const showNotification = ref(false);
const notificationMessage = ref('');

// Function to List tasks from the API
const ListTasks = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/tasks`);
    tasks.value = response.data.map((task: any) => ({
      ...task,
      create_date: task.create_date ? new Date(task.create_date) : undefined,
      update_date: task.update_date ? new Date(task.update_date) : undefined,
    }));
  } catch (error) {
    console.error('Error Listing tasks:', error);
    showNotification.value = true;
    notificationMessage.value = 'Error loading tasks';
  }
};

onMounted(() => {
    if(isAuthenticated.value){
        ListTasks(); 
    }else{
        showNotification.value=true;
        notificationMessage.value="Please Login First ";
    }
});
</script>

<template>
  <div class="container text-center">
    <!-- Notification Component for General Messages -->
    <Notification v-if="showNotification" :message="notificationMessage" @close="showNotification = false" />
    
    <h2 class="mt-5">Your Tasks </h2>
    <table class="table table-bordered mt-5 w-100">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="task.id">
          <th scope="row">
            <span :class="{'finished': task.status === 'done'}">{{ task.title }}</span>
          </th>
          <td>{{ task.description || 'No description' }}</td>
          <td>{{ task.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Container background and text color */
.container {
  background-color: #000000; /* Black background */
  color: #ffffff; /* White text color */
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  padding-bottom: 20px;
}

/* Table styles */
.table {
  background-color: #000000; /* Black background for table */
  color: #ffffff; /* White text color for table */
}

.table thead {
  background-color: #000000; /* Black background for table header */
}

.table th, .table td {
  border-color: #074713; /* Custom green border color */
  background-color: #000000; /* Black background for table cells */
  color: #ffffff; /* White text color for table cells */
}

.table tbody tr:nth-child(even) {
  background-color: #111111; /* Slightly lighter black for even rows */
}

.table tbody tr:hover {
  background-color: #222222; /* Dark gray highlight on row hover */
}

/* Adds text decoration for completed tasks */
.finished {
  text-decoration: line-through;
  text-decoration-thickness: 4px;
}
</style>
