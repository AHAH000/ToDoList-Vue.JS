<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { type ToDoListApi, API_DATA_UPLOAD } from '../api/ToDoListApi';
import { onBeforeRouteLeave } from 'vue-router';
import Notification from '../components/Notification.vue';

const VITE_API_URL = 'https://todo.nafistech.com/api';

const tasks = ref<ToDoListApi[]>([]);
const taskInput = ref('');
const taskDescription = ref('');
const editIndex = ref<number | null>(null);
const showNotification = ref(false);
const notificationMessage = ref('');
const showConfirmation = ref(false);
const confirmationMessage = ref('');
const onConfirm = ref<(() => void) | null>(null); // Function to call on confirmation

// Function to fetch tasks from the API
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
  }
};

onMounted(() => {
  ListTasks();
});

onBeforeRouteLeave((to, from, next) => {
  if (API_DATA_UPLOAD.DATA_UPLOADED) {
    API_DATA_UPLOAD.TASK_DATA = tasks.value;
  }
  next();
});

const AddTask = async () => {
  if (taskInput.value.trim().length === 0) {
    showNotification.value = true;
    notificationMessage.value = 'You have to enter a Task Title';
    return;
  }

  const newTask: ToDoListApi = {
    title: taskInput.value.trim(),
    description: taskDescription.value.trim() || '',
    status: 'in_progress'
  };

  try {
    if (editIndex.value !== null) {
      const updatedTask: ToDoListApi = {
        ...tasks.value[editIndex.value],
        ...newTask,
        id: tasks.value[editIndex.value].id
      };
      const response = await axios.patch(`${VITE_API_URL}/tasks/${updatedTask.id}`, updatedTask);
      tasks.value[editIndex.value] = response.data;
      editIndex.value = null;
    } else {
      const response = await axios.post(`${VITE_API_URL}/tasks`, newTask);
      tasks.value.push(response.data);
    }

    taskInput.value = '';
    taskDescription.value = '';
    showNotification.value = true;
    notificationMessage.value = editIndex.value !== null ? 'Task updated successfully' : 'Task added successfully';
    editIndex.value = null;
  } catch (error: any) {
    if (error.response) {
      console.error('Error adding/updating task:', error.response.data);
      showNotification.value = true;
      notificationMessage.value = 'Error: ' + (error.response.data.message || 'An unknown error occurred');
    } else if (error.request) {
      console.error('No response received:', error.request);
      showNotification.value = true;
      notificationMessage.value = 'Error: No response from server';
    } else {
      console.error('Error setting up request:', error.message);
      showNotification.value = true;
      notificationMessage.value = 'Error: ' + error.message;
    }
  }
};

// Function to show the confirmation dialog
const showConfirmDialog = (message: string, onConfirmCallback: () => void) => {
  confirmationMessage.value = message;
  showConfirmation.value = true;
  onConfirm.value = onConfirmCallback;
};

// Function to handle the confirmation response
const handleConfirmation = (confirmed: boolean) => {
  if (confirmed && onConfirm.value) {
    onConfirm.value();
  }
  showConfirmation.value = false;
};

// Function to delete a task with confirmation
const deleteTask = (index: number) => {
  const task = tasks.value[index];

  if (task.status === 'done') {
    showNotification.value = true;
    notificationMessage.value = 'Congratulations on finishing the task!';
    tasks.value.splice(index, 1);
    return; // Exit function early to avoid unnecessary API call
  }

  showConfirmDialog(
    `Are you sure you want to delete the task titled "${task.title}"?`,
    async () => {
      try {
        await axios.delete(`${VITE_API_URL}/tasks/${task.id}`);
        tasks.value.splice(index, 1);
      } catch (error) {
        console.error('Error deleting task:', error);
        showNotification.value = true;
        notificationMessage.value = 'Error: Could not delete task';
      }
    }
  );
};

const startEditing = (index: number) => {
  taskInput.value = tasks.value[index].title;
  taskDescription.value = tasks.value[index].description;
  editIndex.value = index;
};

const updateTaskStatus = async (index: number, status: string) => {
  try {
    const updatedTask: ToDoListApi = {
      ...tasks.value[index],
      status,
    };
    const response = await axios.patch(`${VITE_API_URL}/tasks/${updatedTask.id}`, updatedTask);
    tasks.value[index] = response.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    showNotification.value = true;
    notificationMessage.value = 'Error: Could not update task status';
  }
};
</script>

<template>
  <div class="container text-center">
    <!-- Notification Component for General Messages -->
    <Notification v-if="showNotification" :message="notificationMessage" @close="showNotification = false" />
    
    <!-- Notification Component for Confirmation -->
    <Notification v-if="showConfirmation" :message="confirmationMessage" :hasConfirm="true" @confirm="handleConfirmation(true)" @cancel="handleConfirmation(false)" />
    
    <h2 class="mt-5">To Do List</h2>
    <div class="d-flex justify-content-center mb-3">
      <input v-model="taskInput" type="text" placeholder="Enter Task Title" class="form-control me-2 task-input">
      <input v-model="taskDescription" type="text" placeholder="Enter Task Description" class="form-control me-2 description-input">
      <button @click="AddTask" class="btn btn-success rounded-0 add-task-btn">
        {{ editIndex !== null ? 'Update Task' : 'Add Task' }}
      </button>
    </div>
    <table class="table table-bordered mt-5 w-100">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col" class="text-center">Edit</th>
          <th scope="col" class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="task.id">
          <th scope="row">
            <span :class="{'finished': task.status === 'done'}">{{ task.title }}</span>
          </th>

          <td>{{ task.description || 'No description' }}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle status-dropdown-toggle" type="button" :id="'statusDropdown' + index" data-bs-toggle="dropdown" aria-expanded="false">
                {{ task.status }}
              </button>
              <ul class="dropdown-menu status-dropdown-menu" :aria-labelledby="'statusDropdown' + index">
                <li><a class="dropdown-item" href="#" @click="updateTaskStatus(index, 'pending')">pending</a></li>
                <li><a class="dropdown-item" href="#" @click="updateTaskStatus(index, 'in_progress')">in_progress</a></li>
                <li><a class="dropdown-item" href="#" @click="updateTaskStatus(index, 'done'); completedTask(index)">done</a></li>
              </ul>
            </div>
          </td>
          <td class="text-center">
            <font-awesome-icon :icon="faPen" @click="startEditing(index)" style="cursor: pointer;" class="icon-hover" />
          </td>
          <td class="text-center">
            <font-awesome-icon :icon="faTrash" @click="deleteTask(index)" style="cursor: pointer;" class="icon-hover" />
          </td>
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

/* Make the Add Task button wider */
.add-task-btn {
  min-width: 150px; /* Adjust as needed */
}

/* Make the task input wider and dynamic */
.task-input {
  flex: 1;
  min-width: 200px; /* Adjust as needed */
  background-color: #333333; /* Dark gray background */
  color: #ffffff; /* White text color */
  border: 1px solid #444444; /* Darker border for better contrast */
}

/* Make the description input wider and dynamic */
.description-input {
  flex: 1;
  min-width: 300px; /* Adjust as needed */
  background-color: #333333; /* Dark gray background */
  color: #ffffff; /* White text color */
  border: 1px solid #444444; /* Darker border for better contrast */
}

/* Placeholder text color */
.task-input::placeholder,
.description-input::placeholder {
  color: #ffffff; /* White placeholder text */
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

/* Dropdown menu and button styles */
.status-dropdown-menu {
  background-color: #28a745; /* Green background color */
  color: #ffffff; /* White text color */
  border: 1px solid #28a745; /* Match the border color with the background */
}

.status-dropdown-menu .dropdown-item {
  color: #ffffff; /* White text color */
}

.status-dropdown-menu .dropdown-item:hover {
  background-color: #1e7e34; /* Darker green on hover */
}

.status-dropdown-toggle {
  background-color: #28a745; /* Green background color */
  color: #ffffff; /* White text color */
}

.status-dropdown-toggle:hover {
  background-color: #1e7e34; /* Darker green on hover */
}

/* Add hover effect to icons */
.icon-hover {
  transition: transform 0.3s ease, color 0.3s ease;
}

.icon-hover:hover {
  transform: translateY(-5px); /* Move icon up by 5px */
  color: #28a745; /* Change color on hover */
}

/* Ensure consistent alignment */
.table td, .table th {
  vertical-align: middle;
}

/* Adds text decoration for completed tasks */
.finished {
  text-decoration: line-through;
  text-decoration-thickness: 4px;
}
</style>
