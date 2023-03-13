<script setup>
import UserItem from './UserItem.vue'

const props = defineProps({
  users: Object
})

</script>
<template>
  <div class="right-panel">
    <h3>Utilisateurs</h3>
    <ul>
      <li v-for="user of users">
        <UserItem :user="user"></UserItem>
      </li>
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
  background-color: #2a2d31;
}

/* .right-panel h3 {
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
  list-style: none;
  text-align: left;
  padding: 3px;
}

.right-panel li {
  line-height: normal;
  padding-left: 20px;
  padding-top: 3px;
  margin-top: 5px;
  border-radius: 7px;
  height: 30px;
  font-size: 20px;

}

li:hover {
  background-color: #303338;
} */
</style>