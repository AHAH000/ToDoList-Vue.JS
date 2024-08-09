<script setup lang="ts">
  import { ref, defineEmits, defineProps } from 'vue';
  
  const props = defineProps({
    message: {
      type: String,
      required: true
    },
    hasConfirm: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['confirm', 'cancel', 'close']);
  
  const visible = ref(true);
  
  const handleConfirm = () => {
    emit('confirm');
    visible.value = false;
  };
  
  const handleCancel = () => {
    emit('cancel');
    visible.value = false;
  };
  
  const handleClose = () => {
    emit('close');
    visible.value = false;
  };
  </script>



<template>
    <div v-if="visible" class="notification-overlay">
      <div class="notification-box">
        <p>{{ message }}</p>
        <button v-if="hasConfirm" @click="handleConfirm" class="btn btn-success">OK</button>
        <button v-if="hasConfirm" @click="handleCancel" class="btn btn-danger">Cancel</button>
        <button v-else @click="handleClose" class="btn btn-success">OK</button>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  .notification-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .notification-box {
    background: #000;
    color: #fff;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    border-block-color: green;
  }
  
  .btn-success {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
  }
  
  .btn-success:hover {
    background-color: #1e7e34;
  }
  .btn-danger {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
  }
  </style>
  