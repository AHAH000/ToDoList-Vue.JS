<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

// Define reactive tasks array
const tasks = ref([
  { name: 'Finish the Vue Task',description: 'Make A To Do List using Vue.js' ,status: 'To Do' },
  { name: 'Task 2', description: '',status: 'To Do' }
]);

// Define reactive taskInput and editIndex
const taskInput = ref('');
const taskDescription = ref('');
const editIndex = ref<number | null>(null);

// Function to add a new task
const AddTask = () => {
  if (taskInput.value.trim().length === 0) {
    alert('You have to enter a Task ');
    return;
  }

  if (editIndex.value !== null) {
   // if Task Index Already exits just edit the Task
    tasks.value[editIndex.value].name = taskInput.value.trim();
    tasks.value[editIndex.value].description = taskDescription.value.trim() || '';
    editIndex.value = null; 
  } else {
    // Add a new task if index does not exist
    tasks.value.push({
      name: taskInput.value.trim(),
      description: taskDescription.value.trim() || '',
      status: 'To Do' 
    });
  }

  // Set The Text Input Back Again 
  taskInput.value = '';
   taskDescription.value = '';
};

// Function to delete a task with confirmation
const deleteTask = (index: number) => {
  const task = tasks.value[index];
  
  if (task.status === 'Completed') {
    // Celebrate and then delete if the task is completed
    alert('Congratulations on finishing the task!');
    tasks.value.splice(index, 1);
  } else {
    // Confirm deletion if the task is not completed
    if (confirm('Are you sure you want to delete this task?')) {
      tasks.value.splice(index, 1);
    }
  }
 
};

// Function to start editing a task
const startEditing = (index: number) => {
  taskInput.value = tasks.value[index].name;
  taskDescription.value = tasks.value[index].description;
  editIndex.value = index;
};

// Function to Celebrate the user finishing the task then removing it 
const completedTask =(index:number)=>{
  if(tasks.value[index].status=="Completed"){
    //alert('Congratulations on finishing the task!');
    deleteTask(index);
  }
}

</script>


<template>
  <div class="container text-center">
    <h2 class="mt-5">To Do List</h2>
    <div class="d-flex justify-content-center mb-3">
      <input v-model="taskInput" type="text" placeholder="Enter Task Name" class="form-control me-2 task-input">
      <input v-model="taskDescription" type="text" placeholder="Enter Description (optional)" class="form-control me-2 description-input">
      <button @click="AddTask" class="btn btn-success rounded-0 add-task-btn">
        {{ editIndex !== null ? 'Update Task' : 'Add Task' }}
      </button>
    </div>
    <table class="table table-bordered mt-5 w-100">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <th scope="row">{{ task.name }}</th>
          <td>{{ task.description || 'No description' }}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle status-dropdown-toggle" type="button" :id="'statusDropdown' + index" data-bs-toggle="dropdown" aria-expanded="false">
                {{ task.status }}
              </button>
              <ul class="dropdown-menu status-dropdown-menu" :aria-labelledby="'statusDropdown' + index">
                <li><a class="dropdown-item" href="#" @click="task.status = 'To Do'">To Do</a></li>
                <li><a class="dropdown-item" href="#" @click="task.status = 'In Progress'">In Progress</a></li>
                <li><a class="dropdown-item" href="#" @click="task.status = 'Completed'; completedTask(index)">Completed</a></li>
              </ul>
            </div>
          </td>
          <td>
            <div class="text-center">
              <font-awesome-icon :icon="faPen" @click="startEditing(index)" style="cursor: pointer;" class="icon-hover" />
            </div>
          </td>
          <td>
            <div class="text-center">
              <font-awesome-icon :icon="faTrash" @click="deleteTask(index)" style="cursor: pointer;" class="icon-hover" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<style scoped>

/* Center the container */
.container {
  background-color: #f8f9fa; /* Light gray background */
  max-width: 800px;
  margin: 0 auto;
}

/* Make the Add Task button wider */
.add-task-btn {
  min-width: 150px; /* Adjust as needed */
}

/* Make the task input wider and dynamic */
.task-input {
  flex: 1;
  min-width: 200px; /* Adjust as needed */
}

/* Make the description input wider and dynamic */
.description-input {
  flex: 1;
  min-width: 300px; /* Adjust as needed */
}

/* Ensure dropdown button and menu have consistent width */
/* Change the dropdown menu background color to green */
.status-dropdown-menu {
  background-color: #28a745; /* Green background color */
  color: #ffffff; /* White text color */
  border: 1px solid #28a745; /* Match the border color with the background */
}

/* Change the text color and background of dropdown items */
.status-dropdown-menu .dropdown-item {
  color: #ffffff; /* White text color */
}

.status-dropdown-menu .dropdown-item:hover {
  background-color: #157028; /* Darker green on hover */
}

/* Optional: Change the background color of the dropdown toggle button */
.status-dropdown-toggle {
  background-color: #157028; /* Green background color */
  color: #ffffff; /* White text color */
}

.status-dropdown-toggle:hover {
  background-color: #157028; /* Darker green on hover */
}

/* Add hover effect to icons */
.icon-hover {
  transition: transform 0.3s ease, color 0.3s ease;
}

.icon-hover:hover {
  transform: translateY(-5px); /* Move icon up by 5px */
  color: #157028; /* Change color on hover (optional) */
}

/* Ensure consistent alignment */
.table td, .table th {
  vertical-align: middle;
}
</style>
