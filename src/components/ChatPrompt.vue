<script setup>
import MessageItem from "@/components/MessageItem.vue";
import {ServiceMessage} from "@/service/ServiceMessage";
import {reactive, watch, ref} from "vue";
import {useRoute} from "vue-router";

const messages = reactive([]);
const promptMsg = ref('');
const route = useRoute();
let currentId = route.params.id;


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
  if (promptMsg.value.trim() !== '') {
    console.log(promptMsg.value);
    const response = await ServiceMessage.sendMessage(currentId, promptMsg.value);
    if (response.status === 200) {
      console.log(response);
    }
    console.log(response);
  }
}
getAllMessages(currentId);

watch(() => route.params.id, (newId) => {
  currentId = newId;
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
      <form @submit.prevent="sendMessage()">
      <input type="text" id="prompt" name="Text" placeholder="ECRIVEZ UN MESSAGE..." v-model="promptMsg" >
      
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
  margin-bottom: 35px;
  border:#554949 solid 1px;
  /* margin-right: 160px; */
}

#prompt {
  position: fixed;
  bottom: 0;
  margin-left: 160px;
  margin-bottom: 10px;
  width: 50%;
  padding: 11px;
  background-color: #554949;
  border-radius: 30px;
  color: #D9D9D9;
  border: none;
 
}

#prompt::placeholder {
  color: #D9D9D9;
  font-weight: 400;
  font-size: 15px;
  line-height: 21px;
  opacity: 0.6; 
}
</style>