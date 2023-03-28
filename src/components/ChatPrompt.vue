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

    <div class="messages">
      <MessageItem v-for="message of messages" :key="messages" :message="message"></MessageItem>
      <form @submit.prevent="sendMessage()">
      <input type="text" id="prompt" name="Text" :placeholder="placeholderText" v-model="promptMsg" >
      </form>
      <!-- Liste des messages -->
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

#prompt {
  position: fixed;
  bottom: 0;
  width: 77%;
  padding: 1em;
  border-radius: 18px;
}

</style>