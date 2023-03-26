<script setup>
// Components
import UserList from "@/components/UserList.vue";
import ChatPrompt from "@/components/ChatPrompt.vue";
import ChannelList from "@/components/ChannelList.vue";
import ModalFrame from "@/components/ModalFrame.vue";
import Home from "@/components/Home.vue";

import {reactive, watchEffect} from "vue";
import {ServiceChannel} from "@/service/ServiceChannel";

import {useRoute} from "vue-router";
import router from "@/router";

const channels = reactive([])
let users = reactive([])
let type = reactive([])
let channelId = reactive([])

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

const openOrClosePopup = (typeEmit,getChannelId,value) => {
  type = typeEmit;
  channelId = getChannelId;
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
  <div>
    <ChannelList :channels="channels" @openOrClosePopup="openOrClosePopup"></ChannelList>
    <ChatPrompt v-if="channels.find(c => c.id == currentId)" :channels="channels"></ChatPrompt>
    <Home v-else></Home>
    <ModalFrame v-if="showingPopup.value" @openOrClosePopup="openOrClosePopup" :type="type" :channelId="channelId" @refresh="refresh"></ModalFrame>
    <UserList v-if="channels" :users="users" @openOrClosePopup="openOrClosePopup" :channels="channels" @refresh="refresh"></UserList>
  </div>
</template>



<style scoped>
div{
  display: flex;
}
</style>
