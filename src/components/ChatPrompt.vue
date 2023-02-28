<script setup>
import MessageItem from "@/components/MessageItem.vue";
import {ServiceMessage} from "@/service/ServiceMessage";
import {reactive, watch, ref} from "vue";
import {useRoute} from "vue-router";

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

const getAllMessages = async (currentId) => {
  messages.splice(0)
  const response = await ServiceMessage.getAllMessages(currentId);
  if (response.status === 200) {
    const result = await response.json();
    for (let message of result){
      messages.push(message)
    }
    console.log(messages)
  }
}
const sendMessage = async () => {
  console.log(promptMsg.value);
  const response = await ServiceMessage.sendMessage(currentId, promptMsg.value);
  if (response.status === 200) {
    console.log(response);
  }
  console.log(response);
}
getAllMessages(currentId);

watch(() => route.params.id, (newId) => {
  currentId = newId;
  changePromptName(currentId);
  getAllMessages(currentId);
})

</script>

<template>

  <div class="chat">
    <div class="messages">
      <MessageItem v-for="message of messages" :message="message"></MessageItem>
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