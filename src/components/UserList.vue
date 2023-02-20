<script setup>
import UserItem from './UserItem.vue'
import {reactive} from "vue";
import {ServiceChannel} from "../service/ServiceChannel";
const props = defineProps({
  users: [],
})
let channels = reactive([])
const getAllChannel = async () => {
  const response = await ServiceChannel.getAllChannel()
    const result = await response.json();
    if (response.status === 200) {
      for (let channel of result){
        channels.push(channel)
      }
    }
}
getAllChannel();
</script>
<template>
  <div class="right-panel">
    <h3>Utilisateurs</h3>
    <ul v-for="channel of channels">
      <li>{{ channel.name }} :</li>
      <li v-for="user of channel.users"><UserItem :user="user"></UserItem></li>
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
}
</style>