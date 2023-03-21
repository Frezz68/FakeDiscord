<script setup>
// Components
import UserList from "@/components/UserList.vue";
import ChatPrompt from "@/components/ChatPrompt.vue";
import ChannelList from "@/components/ChannelList.vue";
import ModalAddUser from "@/components/ModalAddUser.vue";
import Home from "@/components/Home.vue";

import {reactive, watchEffect} from "vue";
import {ServiceChannel} from "@/service/ServiceChannel";
import {ServiceUtilisateur} from "@/service/ServiceUser";

import {useRoute} from "vue-router";
import router from "@/router";

const channels = reactive([])
let users = reactive([])

const route = useRoute();
let currentId;

const isLogin = async () => {
  const response = await ServiceUtilisateur.isLogin();
  if (response.status === 200) {
    const result = await response.json();
    localStorage.setItem('token', result.token)
    return true;
  }
  else if (response.status === 401){

    localStorage.removeItem('token')
    router.push({ path: '/' })
    console.log("401 login")
  }
}
const initChannel = async () => {
  const response = await ServiceChannel.getAllChannel();
  if (response.status === 200) {
    const result = await response.json();
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

isLogin();
initChannel();

watchEffect( () => {
  currentId = route.params.id;
  getAllChannelUser(currentId);
})

</script>
<template>
  <div>
    <ChannelList :channels="channels"></ChannelList>
    <ChatPrompt v-if="channels.find(c => c.id == currentId)" :channels="channels"></ChatPrompt>
    <Home v-else></Home>
    <ModalAddUser v-if="showingPopup.value" @open-or-close-popup="openOrClosePopup"></ModalAddUser>
    <UserList v-if="channels" :users="users" @open-or-close-popup="openOrClosePopup"></UserList>
  </div>
</template>



<style scoped>
div{
  display: flex;
}
</style>
