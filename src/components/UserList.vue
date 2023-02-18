<script setup>
import UserItem from './UserItem.vue'
import {reactive} from "vue";

const users = reactive([
  {
    id: 1,
    name: "Alan"
  },
  {
    id: 2,
    name:"Theo"
  },
  {
    id: 2,
    name:"Theo"
  },
  {
    id: 3,
    name:"Mansour"
  },
  {
    id: 4,
    name:"Arnaud"
  }
  ])
</script>
<template>
  <div class="right-panel">
    <h3>Utilisateurs</h3>
    <ul>
      <li v-for="(_,index) of users"><UserItem :user="users[index]"></UserItem></li>
    </ul>
  </div>
</template>

<style scoped>
.right-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 250px;
  background-color: #2a2d31;
}
.right-panel h3 {
  text-align: center;
  border-radius: 5px;
  box-shadow: 1px 0 5px 1px #252525;
  margin-top: 3px;
  margin-left: 2px;
  margin-bottom: 20px;
  padding: 2px;
  background-color: #303338;

}
.right-panel ul {
  list-style: url('../assets/logo.svg');
  text-align: left;

}
.right-panel li {
  margin-top: 5px;

}
</style>