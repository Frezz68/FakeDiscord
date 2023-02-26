<script setup>
import UserList from "@/components/UserList.vue";
import ChannelList from "@/components/ChannelList.vue";
import MainChannel from "@/components/MainChannel.vue"

import { reactive, watch, watchEffect } from "vue";
import { ServiceChannel } from "@/service/ServiceChannel";
import { useRoute } from "vue-router";

const channels = reactive([])
let users = reactive([])

const route = useRoute();
let currentId;
const initChannel = async () => {
  const response = await ServiceChannel.getAllChannel()
  const result = await response.json();
  if (response.status === 200) {
    for (let channel of result) {
      channels.push(channel)
    }
  }
}

const getAllChannelUser = async (currentId) => {
  users.splice(0)
  let filteredChannels = channels.find(channel => channel.id == currentId)
  if (!filteredChannels) return;
  for (let user of filteredChannels.users) {
    users.push(user)
  }
}
initChannel();
watchEffect(() => {
  currentId = route.params.id;
  getAllChannelUser(currentId);
})
</script>

<template>
  <div class="wrapper">
    <ChannelList :channels="channels"></ChannelList>
    <MainChannel></MainChannel>
    <UserList v-if="channels" :users="users"></UserList>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  height: 100vh;
}
</style>