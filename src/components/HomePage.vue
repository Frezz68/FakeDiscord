<script setup>
import UserList from "@/components/UserList.vue";
import ChatPrompt from "@/components/ChatPrompt.vue";
import ChannelList from "@/components/ChannelList.vue";
import {reactive, watch, watchEffect} from "vue";
import {ServiceChannel} from "@/service/ServiceChannel";
import {useRoute} from "vue-router";

const channels = reactive([])
let users = reactive([])

const route = useRoute();
let currentId;
const initChannel = async () => {
  const response = await ServiceChannel.getAllChannel()
  const result = await response.json();
  if (response.status === 200) {
    for (let channel of result){
      channels.push(channel)
    }
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
initChannel();
watchEffect( () => {
  currentId = route.params.id;
  getAllChannelUser(currentId);
})
</script>
<template>
  <ChannelList :channels="channels"></ChannelList>
  <ChatPrompt></ChatPrompt>
  <UserList v-if="channels" :users="users"></UserList>
</template>



<style scoped>

</style>