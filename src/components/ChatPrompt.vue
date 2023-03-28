<script setup>
import MessageItem from "@/components/MessageItem.vue";
import {ServiceMessage} from "@/service/ServiceMessage";
import {reactive, watch, ref, defineEmits} from "vue";
import {useRoute} from "vue-router";
import {getWebSocket} from "@/websocket/websocket";

const messages = reactive([]);
const promptMsg = ref('');
const route = useRoute();
let currentId = route.params.id;
let placeholderText = ref('');
const props = defineProps({
  channels: {
    type: Object,
  }
})

const changePromptName = (currentId) => {
  let filteredChannels = props.channels.find(channel => channel.id == currentId)
  console.log(filteredChannels)
  placeholderText.value = 'Envoyer un message dans ' + filteredChannels.name;
}

changePromptName(currentId);
let ws = getWebSocket(currentId,localStorage.getItem("token"));

const getAllMessages = async (currentId) => {
  messages.splice(0)
  const response = await ServiceMessage.getAllMessages(currentId);
  if (response.status === 200) {
    const result = await response.json();
    for (let message of result){
      messages.push(message)
    }
  }
}
const sendMessage = async () => {
  if (/^\s*$/.test(promptMsg.value)) return;
  if(promptMsg.value === '') return;
  const response = await ServiceMessage.sendMessage(currentId, promptMsg.value);
  if (response.status === 200) {
    promptMsg.value = '';
  }
}

const initWebSocket = async () => {
  ws = null;
  ws = getWebSocket(currentId, localStorage.getItem("token"));
  ws.then((ws) => {
    ws.onmessage = (event) => {
      messages.push(JSON.parse(event.data))
    }
  })
}

getAllMessages(currentId);

watch(() => route.params.id, async (newId) => {
  currentId = newId;
  changePromptName(currentId);
  await getAllMessages(currentId);
  (await ws).close();
  ws = null;
  await initWebSocket();
})

const emits = defineEmits(['openOrClosePopup'])

const openPopup = (type,channelId = null) => {
  console.log("openPopup", type, channelId)
  emits('openOrClosePopup',type,channelId,true)
}

</script>

<template>

    <div class="messages">
      <MessageItem v-for="message of messages" :key="messages" :message="message" :channels="props.channels"></MessageItem>
      <!-- Liste des messages -->
    </div>
    <div class="input">
      <!--<input type="text" placeholder="Envoyer un message..."> -->
      <form @submit.prevent="sendMessage()">
        <input type="text" id="prompt" name="Text" :placeholder="placeholderText" v-model="promptMsg" >
      </form>
      <button class="sendImg" v-on:click="openPopup('sendImage',currentId)">
        <img class="Image" src="../assets/image.png" >
      </button>
    </div>
      <!--<input type="text" placeholder="Envoyer un message..."> -->
</template>

<style >
.messages {
  position: absolute;
  width: 80%;
  height: 95vh;
  overflow-y: auto;
}

.input #prompt {
  position: fixed;
  bottom: 0;
  margin-left: 1%;
  width: 60%;
  padding: 1em;
  border-radius: 18px;
}

.input .sendImg {
  position: fixed;
  bottom: 0;
  right: 16%;
  width: 60px;
  background-color: #2e3035;
  border-radius: 8px;
}

.input .sendImg:hover {
  background-color: #3f4146;
}

.input .sendImg .Image {
  width: 80%;
  height: 100%;
}


/*@media (max-width: 1100px) {
  #prompt {
    width: 95%;
  }
  .messages {
    width: 99%;
  }
}*/
</style>