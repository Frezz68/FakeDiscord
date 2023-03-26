<script setup>
import {defineEmits} from "vue";
import {ServiceChannel} from "../service/ServiceChannel";
import {useRouter} from "vue-router";


/*let channels = reactive([])
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

initChannel();
*/
let userConnected = localStorage.getItem("username");

const props = defineProps({
  channels: {
    type: Object,
  }
})

const emits = defineEmits(['openOrClosePopup'])

const openPopup = (type,channelId = null) => {
  console.log("openPopup", type, channelId)
  emits('openOrClosePopup',type,channelId,true)
}

</script>
<template>
  <div class="left-panel">
    <h3>Channels</h3>
    <button class="button" v-on:click="openPopup('addChannel')">Ajouter un channel</button>
    <ul v-for="channel of channels">
      <RouterLink :to="`/channels/${channel.id}`">
        <li>
          <img :src="channel.img" class="imgChannel">
          {{ channel.name }}
        </li>
      </RouterLink>
      <div class="channelManager" v-if="userConnected === channel.creator">
        <img src="../assets/bouton-modifier.png" alt="modifier" class="imgManager" v-on:click="openPopup('editChannel',channel.id)">
      </div>
      <div class="channelManager" v-if="userConnected === channel.creator">
        <img src="../assets/poubelle.png" alt="Poubelle" class="imgManager" v-on:click="openPopup('deleteChannel',channel.id)">
      </div>
    </ul>
  </div>
</template>

<style scoped>

.left-panel h3 {
  text-align: center;
  border-radius: 5px;
  box-shadow: 1px 0 5px 1px #252525;
  margin-top: 3px;
  margin-left: 2px;
  margin-bottom: 20px;
  padding: 2px;
  background-color: #303338;

}
.left-panel ul {
  display: inline-block;
  list-style: none;
  text-align: left;
  padding: 3px;
}
.left-panel ul a {
  text-decoration: none;
  color: unset;
}
.left-panel ul li {
  display: inline-block;
  line-height: normal;
  padding-left: 15px;
  padding-top: 3px;
  margin-top: 5px;
  border-radius: 7px;
  height: 30px;
  font-size: 20px;

}

.left-panel ul li .imgChannel {
  height: 15px;
}

.left-panel ul .channelManager .imgManager {
  height: 25px;
  width: 25px;
  right: 5px;
}

li {
  width: 90%;
  height: auto;
}

li:hover {
  background-color: #303338;
}

.left-panel ul .channelManager {
  display: inline-block;
  width: 20%;
  opacity: 0;
  vertical-align: top;
  transition: opacity 0.3s ease;
}

ul:hover .channelManager {
  opacity: 1;
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
</style>