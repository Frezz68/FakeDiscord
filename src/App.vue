<script setup>
//import HelloWorld from './components/HelloWorld.vue'
import { RouterLink, RouterView } from 'vue-router'
import UserList from './components/UserList.vue'
import LoginPage from "./views/LoginView.vue";
</script>

<template>
    <div class="wrapper">
    </div>
  <router-view></router-view>
</template>

<style scoped>
/*
header {
  line-height: 1.5;
}


@media (min-width: 1024px) {

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}*/
</style>
