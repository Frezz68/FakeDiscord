<script setup>
import UserList from "@/components/UserList.vue";
import ChatPrompt from "@/components/ChatPrompt.vue";
import ChannelList from "@/components/ChannelList.vue";
import {reactive} from "vue";
import {ServiceChannel} from "@/service/ServiceChannel";
import {useRoute} from "vue-router";


let channels = reactive([])
const initChannel = async () => {
  const response = await ServiceChannel.getAllChannel()
  const result = await response.json();
  if (response.status === 200) {
    for (let channel of result){
      channels.push(channel)
    }
    console.log(channels)
  }
}
const route = useRoute();
const currentId = route.params.id;
let filteredChannels = reactive([])
let users = reactive([])
const getAllChannelUser = async () => {
  const response = await ServiceChannel.getAllChannel()
  const result = await response.json();
  if (response.status === 200) {
    filteredChannels = result.find(channel => channel.id == currentId)
    for(let user of filteredChannels.users){
      users.push(user)
    }
  }
}

initChannel();
getAllChannelUser();
</script>
<template>
  <ChannelList :channels="channels"></ChannelList>
  <ChatPrompt></ChatPrompt>
  <UserList v-if="channels" :users="users"></UserList>
</template>



<style scoped>

</style>