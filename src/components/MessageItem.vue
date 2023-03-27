<script setup>
import {ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {ServiceMessage} from "../service/ServiceMessage";

const props = defineProps({
  message: {
    type: Object,
  }
})
const datemsg = new Date(props.message.timestamp);
const dateNow = new Date();
let dateStr = "";
const route = useRoute();
let currentId;

const affichageDate = (datemsg, dateNow) => {
  if (datemsg.getDate() === dateNow.getDate() && datemsg.getMonth() === dateNow.getMonth() && datemsg.getFullYear() === dateNow.getFullYear()) {
    dateStr = "Aujourd'hui à " + datemsg.getHours() + ":" + datemsg.getMinutes();
  } else if (datemsg.getDate() === dateNow.getDate() - 1 && datemsg.getMonth() === dateNow.getMonth() && datemsg.getFullYear() === dateNow.getFullYear()) {
    dateStr = "Hier à " + datemsg.getHours() + ":" + datemsg.getMinutes();
  } else {
    dateStr = datemsg.getDate() + "/" + (datemsg.getMonth() + 1) + "/" + datemsg.getFullYear() + " " + datemsg.getHours() + ":" + datemsg.getMinutes();
  }
}

let edit = ref(false)
const goEdit = () => {
  console.log(edit)
  edit.value = true;
}

affichageDate(datemsg, dateNow);

watchEffect( () => {
  if(!route.params.id) return;
  currentId = route.params.id;
})

const editContent = async () => {
  console.log("editMessage", props.message)
  try {
    let data;
    if (props.message.content.Text !== null && currentId !== null) {
      data = {
        "channel_id": parseInt(currentId),
        "timestamp": props.message.timestamp,
        "author": props.message.author,
        "content": {
          "Text": props.message.content.Text
        }
      }
    } else {
      data = {
        "channel_id": currentId,
        "timestamp": props.message.timestamp,
        "author": props.message.author,
        "content": {
          "Image": props.message.content.Image
        }
      }
    }
    console.log("data", data)
    const response = await ServiceMessage.editMessage(currentId, data);
    if (response.status === 200) {
      edit.value = false;
      console.log("editMessage", response)
    }
    }
  catch
    (e)
    {
      console.log(e);
    }
  }
</script>

<template>
  <div class="message-box">
    <img v-if="!edit" class="imgDelete" src="../assets/bouton-modifier.png" v-on:click="goEdit">
    <div class="authorDate">
      <h3>{{ message.author }} </h3><span>{{ dateStr}}</span>
    </div>
    <div v-if="!edit" class="AffichageMessage">
      <br v-if="message.content.Image">
      <p v-if="message.content.Text"> {{ message.content.Text }} </p>
      <img v-else :src="message.content.Image" class="imgMessage">
    </div>
    <div v-if="edit && props.message.content.Text != null" class="EditionMessage">
      <input type="text" v-model="props.message.content.Text">
      <button @click="editContent">Valider</button>
    </div>
    <div v-if="edit && props.message.content.Image != null" class="EditionMessage">
      <input type="text" v-model="props.message.content.Image">
      <button @click="editContent">Valider</button>
    </div>
  <br>
  </div>
</template>



<style scoped>
.message-box {
  position: relative;
  padding: 10px;
}

.authorDate {
  display: flex;
}

.imgDelete {
  position: absolute;
  width: 20px;
  margin-top: 10px;
  margin-right: 10px;
  top: 0.2em;
  right: 1em;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.message-box:hover .imgDelete {
  opacity: 1;
}

.authorDate h3 {
  margin-right: 1em;
}

span {
  font-size: 0.6em;
  font-family: cursive;
  text-align: start;
  display: flex;
  vertical-align: bottom;
  margin-top: auto;
}

.imgMessage {
  max-width: 50%;
}

.message-box:hover {
  background-color: #2e3035;
}
</style>