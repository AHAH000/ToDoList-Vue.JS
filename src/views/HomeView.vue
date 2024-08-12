<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

// Add the icons to the library
library.add(fasStar, farStar);
</script>

<template>
  <div class="home">
    <h1>Organize your work and life, finally.</h1>
    <p>Our website offers a streamlined and intuitive to-do list management tool designed to help you stay organized and productive. With a user-friendly interface, you can effortlessly create, edit, and delete tasks, categorize them by status, and set deadlines to keep track of your progress. The platform's dynamic features ensure that your to-do list adapts to your needs, whether you're managing personal goals or coordinating team projects. Access your tasks from any device, and experience a seamless blend of functionality and simplicity that makes staying on top of your responsibilities a breeze</p>
    <router-link to="/to-do-list">
      <button class="btn">Start Now</button>
    </router-link>
  </div>
  <div class="separator"></div> <!-- Separator between Home and Content -->
  <div class="content">
    <div class="img">
      <img src="../assets/images/ToDoListImgUD.png" alt="">
    </div>
    <div class="reviews">
      <h2>Reviews</h2>
      <p>"This is an amazing tool for organizing tasks!" - User A 
        <span>
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
        </span>
      </p>
      <p>"I can't imagine working without it." - User B 
        <span>
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['far', 'star']" />
        </span>
      </p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti totam facere id at nemo ut sit dolore dignissimos accusamus aspernatur! Illo perspiciatis iusto distinctio amet exercitationem, a dicta accusamus quasi. User-C 
        <span>
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['fas', 'star']" />
          <font-awesome-icon :icon="['far', 'star']" />
          <font-awesome-icon :icon="['far', 'star']" />
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: red;
}

.home {
  color: green;
  padding: 5rem;
  border-radius: 8px;
  text-align: center;
}

.home h1 {
  font-size: 3em;
  font-weight: bolder;
  padding-bottom: 15px;
  font-family: 'Times New Roman', Times, serif;
  color: white;
}

.home p {
  font-size: 1em;
  line-height: 1.5;
  color:whitesmoke;
  font-family:Arial, Helvetica, sans-serif;
}

.btn {
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 34px;
  cursor: pointer;
  text-decoration: none; /* Remove underline for router-link */
  display: inline-block; /* Ensure button behaves correctly */
  margin-top: 10px;
}

.btn:hover {
  background-color: darkgreen;
  border-radius: 15px;
}



.content {
  display: flex;
  align-items: center;
  gap: 20px; /* Increased space between image and reviews */
}

.img img {
  width: 655px; /* Increased size */
}

.reviews {
  text-align: left;
  color: white;
  margin-left: 95px; /* Move reviews further to the right */
}

.reviews h2 {
  margin-bottom: 10px;
  font-size: 2em;
  font-family: 'Times New Roman', Times, serif;
}

.reviews p {
  font-size: 1em;
  line-height: 1.5;
  font-family:Arial, Helvetica, sans-serif;
}

.reviews span {
  margin-left: 10px;
}
</style>