<script setup>
// Components
import UserList from "@/components/UserList.vue";
import ChatPrompt from "@/components/ChatPrompt.vue";
import ChannelList from "@/components/ChannelList.vue";
import ModalAddUser from "@/components/ModalAddUser.vue";
import Home from "@/components/Home.vue";

import {reactive, watchEffect} from "vue";
import {ServiceChannel} from "@/service/ServiceChannel";

import {useRoute} from "vue-router";
import router from "@/router";

const channels = reactive([])
let users = reactive([])

const route = useRoute();
let currentId;

const initChannel = async () => {
  const response = await ServiceChannel.getAllChannel();
  if (response.status === 200) {
    const result = await response.json();
    channels.splice(0)
    for (let channel of result){
      channels.push(channel)
    }
  }
  else if (response.status === 401){
    localStorage.removeItem('token')
    router.push({ path: '/' })
    console.log("401 channel")
  }
}

const getAllChannelUser = async (currentId) => {
  users.splice(0)
  let filteredChannels = channels.find(channel => channel.id == currentId)
  if(!filteredChannels) return;
  for (let user of filteredChannels.users){
    users.push(user)
  }
}

let showingPopup = reactive({value: false})

const openOrClosePopup = (value) => {
  showingPopup.value = value;
}

const refresh = () => {
  initChannel();
  getAllChannelUser(currentId);
}

initChannel();

watchEffect( () => {
  currentId = route.params.id;
  getAllChannelUser(currentId);
})

</script>
<template>
  <div class="page">
    <div class="channel-list">
      <ChannelList :channels="channels"></ChannelList>
    </div>
    <div class="chat">
      <ChatPrompt v-if="channels.find(c => c.id == currentId)" :channels="channels"></ChatPrompt>
      <Home v-else></Home>
      <ModalAddUser v-if="showingPopup.value" @openOrClosePopup="openOrClosePopup" @refresh="refresh"></ModalAddUser>
    </div>
    <div class="user-list">
      <UserList v-if="channels" :users="users" @openOrClosePopup="openOrClosePopup" :channels="channels" @refresh="refresh"></UserList>
    </div>
  </div>
</template>



<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}

.channel-list {
  display: inline-block;
  width: 15%;
  height: 100vh;
  vertical-align: top;
  box-shadow: 1px 0 5px 1px #252525;
  border-radius: 5px;
  background-color: #1e1f22;
}

.chat {
  display: inline-block;
  width: 70%;
  vertical-align: top;
  height: 100vh;
}

.user-list {
  display: inline-block;
  width: 15%;
  height: 100%;
  vertical-align: top;
  box-shadow: 1px 0 5px 1px #252525;
  border-radius: 5px;
  background-color: #2a2d31;
}

@media (max-width: 1100px) {
  .channel-list {
    display: none;
  }
  .user-list {
    display: none;
  }
  .chat {
    width: 100%;
  }
}
</style>
