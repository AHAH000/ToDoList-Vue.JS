this the Modal.vue Code
<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <p>{{ message }}</p>
        <button @click="hideModal" class="btn btn-success">OK</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits, defineProps } from 'vue';
  
  const props = defineProps({
    message: String,
    visible: Boolean
  });
  
  const emit = defineEmits(['update:visible']);
  
  const hideModal = () => {
    emit('update:visible', false);
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background-color: #000;
    color: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  
  .btn {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .btn:hover {
    background-color: #1e7e34;
  }
</style>