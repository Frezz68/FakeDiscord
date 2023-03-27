<script setup>
import UserItem from './UserItem.vue'

const props = defineProps({
  users: Object
})

</script>
<template>
  <div class="right-panel">
    <h3>Utilisateurs</h3>
    <hr>
    <ul>
      <li v-for="user of users"><UserItem :user="user"></UserItem></li>
    </ul>
  </div>
</template>

<style scoped>
.right-panel {
  position: fixed;
  flex-basis: 150px;
  flex-direction: column;
  top: 0;
  right: 0;
  bottom: 0;
  width: 180px;
  background-color: #554949;
  overflow: scroll;
}
.right-panel h3 {
  text-align: center;
  border-radius: 20px;
  margin: 10px;
  /* margin-bottom: 10px; */
  padding: 5px;
  color: #554949;
  background-color: #D9D9D9;
}
.right-panel ul {
  list-style: none;
  text-align: left;
  padding: 3px;
}
.right-panel li {
  line-height: normal;
  color: #554949;
  background-color: #D9D9D9;
  font-weight: bold;
  padding-left: 15px;
  padding-right: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  font-size: 15px;
  text-align: left;
  margin: 15px 8px;
}

.right-panel ul li:hover {
  background-color: #303338;
  color: #D9D9D9;
}

hr {
  margin: 5px 15px -4px 15px;
  background-color: #D9D9D9; 
  height: 1.25px;  
}
</style>