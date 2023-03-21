<script setup>
import MessageItem from "@/components/MessageItem.vue";
import {ServiceMessage} from "@/service/ServiceMessage";
import {reactive, watch, ref} from "vue";
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


</script>

<template>

  <div class="chat">
    <div class="messages">
      <MessageItem v-for="message of messages" :key="messages" :message="message"></MessageItem>
      <!-- Liste des messages -->
    </div>
    <div class="input">
      <!--<input type="text" placeholder="Envoyer un message..."> -->
      <form @submit.prevent="sendMessage()">
      <input type="text" id="prompt" name="Text" :placeholder="placeholderText" v-model="promptMsg" >
      </form>
    </div>
  </div>
</template>

<style >
.chat {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* Liste des messages */
.messages {
  flex-grow: 1;
  overflow-y: auto;
  margin-left: 160px;
  margin-bottom: 20px;
}

#prompt {
  position: fixed;
  display: flex;
  bottom: 0;
  margin-left: 150px;
  /*flex: 1 1 auto;*/
    width: 50%;
    padding: 1em;
    /* margin: 1em;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 45%;
    margin-bottom: 1%;*/
    background-color: gainsboro;
    border-radius: 18px;

}
</style>