<script setup>
import UserItem from './UserItem.vue'
import {defineEmits, reactive, watchEffect} from 'vue'
import {useRoute} from "vue-router";
import {ServiceChannel} from "../service/ServiceChannel";

const route = useRoute();
let currentId;
let channelCreator = reactive({});
let userConnected = localStorage.getItem("username");

const props = defineProps({
  users: {
    type: Array,
  },
  channels: {
    type: Object,
  }
})

const emits = defineEmits(['openOrClosePopup', 'refresh'])

const  refreshUser = () => {
  emits('refresh')
}

const getCreator = (currentId) => {
  let channel = props.channels.find(channel => channel.id == currentId)
  if(!channel) return;
  channelCreator = channel.creator
}

const deleteUser = async (user) => {
  console.log("deleteUser", user)
  if (user !== null && currentId !== null) {
    try {
      const response = await ServiceChannel.removeUserFromChannel(currentId, user);
      if (response.status === 200) {
        refreshUser();
      }
    } catch (e) {
      console.log(e);
    }
  }
}

const openPopup = () => {
  emits('openOrClosePopup',"addUser",null,true)
}

watchEffect( () => {
  if(!route.params.id) return;
  currentId = route.params.id;
  console.log("currentId", currentId)
  getCreator(currentId);
})



</script>
<template>
  <div class="right-panel">
    <h3>Utilisateurs</h3>
    <button v-if="userConnected == channelCreator" class="button" v-on:click="openPopup">Ajouter un utilisateur</button>
    <ul>
      <li v-for="user of users">
        <div class="userName">
          <UserItem :user="user"></UserItem>
        </div>
        <div class="delete" v-if="userConnected == channelCreator && user != channelCreator">
          <img src="../assets/poubelle.png" alt="Poubelle" @click="deleteUser(user)">
        </div>
        <div class="couronne" v-if="user == channelCreator">
          <img src="../assets/couronne.png" alt="Poubelle" @click="deleteUser(user)">
        </div>

      </li>
    </ul>
  </div>
</template>

<style scoped>
h3 {
  text-align: center;
  border-radius: 5px;
  box-shadow: 1px 0 5px 1px #252525;
  margin-top: 3px;
  margin-left: 2px;
  margin-bottom: 20px;
  padding: 2px;
  background-color: #303338;
}

.button {
  margin-left: 7%;
  width: 85%;
  padding: 10px;
  background-color: #5765f2;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #4d64b9;
}

li {
  width: 90%;
  height: auto;
}

.userName {
  display: inline-block;
  width: auto;
  vertical-align: top;
}

.delete {
  display: inline-block;
  position: absolute;
  right: 0;
  width: 35px;
  opacity: 0;
  vertical-align: top;
  transition: opacity 0.3s ease;
}

.couronne {
  display: inline-block;
  position: absolute;
  right: 0;
  width: 35px;
  vertical-align: top;
}

li:hover .delete {
  opacity: 1;
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

img {
  height: 25px;
  width: 25px;
}
</style>
