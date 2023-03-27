<template>
  <div class="vue-modal" v-if="type == 'addUser'">
    <div class="vue-modal-inner">
      <div class="vue-modal-content">
        <h2>Ajouter un user</h2>
        <div class="add-user-box">
          <label for="user">Nom de l'utilisateur à ajouter </label>
          <input v-model="username" type="text" id="user" required><br>
        </div>
        <button class="button" type="button" @click="addUser">Ajouter</button>
        <button class="button" @click="closePopup">Annuler</button>
      </div>
    </div>
  </div>

  <div class="vue-modal" v-else-if="type == 'addChannel'">
    <div class="vue-modal-inner">
      <div class="vue-modal-content">
        <h2>Créer un channel</h2>
        <div class="add-user-box">
          <label for="user">Titre du channel </label>
          <input v-model="name" type="text" id="user" required><br>
          <label for="image">URL de l'image </label>
          <input v-model="image" type="text" id="image" required><br>
        </div>
        <button class="button" type="button" @click="addChannel">Ajouter</button>
        <button class="button" @click="closePopup">Annuler</button>
      </div>
    </div>
  </div>

  <div class="vue-modal" v-else-if="type == 'deleteChannel'">
    <div class="vue-modal-inner">
      <div class="vue-modal-content">
        <h2>Confirmation</h2>
        <div class="add-user-box">
          <span>Voulez-vous vraiment supprimer ce channel ?</span>
        </div>
        <button class="button" type="button" @click="deleteChannel">Valider</button>
        <button class="button" @click="closePopup">Annuler</button>
      </div>
    </div>
  </div>

  <div class="vue-modal" v-else-if="type == 'editChannel'">
    <div class="vue-modal-inner">
      <div class="vue-modal-content">
        <h2>Modifier le channel</h2>
        <div class="add-user-box">
          <label for="user">Titre du channel </label>
          <input v-model="name" type="text" id="user" required><br>
          <label for="image">URL de l'image </label>
          <input v-model="image" type="text" id="image" required><br>
          <label for="image"> theme </label>
          <select name="theme" id="lang" v-model="selectValue" required>
          <option value="0 ">theme 1 </option>
          <option value="1">theme 2</option>
          <option value="2">theme 3 </option>
          <option value="3">theme 4</option>
          <option value="4">theme 5</option>
          </select>
        </div>
        <button class="button" type="button" @click="editChannel">Ajouter</button>
        <button class="button" @click="closePopup">Annuler</button>
      </div>
    </div>
  </div>


  
</template>

<script setup>
import {ServiceChannel} from "../service/ServiceChannel";
import {useRoute} from "vue-router";
import {defineEmits, ref} from "vue";
import { themeList } from "./../service/theming";

const route = useRoute();
let currentId;

// adduser
let username = ref("");

// addchannel
let name = ref("");
let image = ref("");

let selectValue = ref()

const props = defineProps({
  type: {
    type: String,
  },
  channelId: String,
});

const emits = defineEmits(['openOrClosePopup', 'refresh'])

const closePopup = () => {
  emits('openOrClosePopup',props.type,false)
}

const  refresh = () => {
  emits('refresh')
}

currentId = route.params.id;
const addUser = () => {
  console.log("addUser", username.value)
  if (username.value !== "") {
    ServiceChannel.addUserToChannel(currentId, username.value)
      .then(async (response) => {
        const result = await response.json();
        if (response.status === 200) {
          closePopup();
          refresh();
        } else {
          this.error = result.message;
        }
      });
  }
}

const addChannel = async () => {
  console.log("addChannel", name.value)
  if (name.value !== "" && image.value !== "") {
    ServiceChannel.addChannel(name.value, image.value)
      .then(async (response) => {
        console.log(response)
        const result = await response.json();
        if (response.status === 200) {
          closePopup();
          refresh();
        } else {
          this.error = result.message;
        }
      });
  }
}
const deleteChannel = () => {
  console.log("deleteChannel", props.channelId)
  if (props.channelId !== "") {
    ServiceChannel.deleteChannel(props.channelId)
      .then(async (response) => {
        console.log(response)
        const result = await response.json();
        if (response.status === 200) {
          closePopup();
          refresh();
        } else {
          this.error = result.message;
        }
      });
  }
}
const editChannel = () => {
  console.log("editChannel", props.channelId)
  if (props.channelId !== "") {
    console.log("log du selectval",selectValue.value);
    ServiceChannel.editChannel(props.channelId,name.value,image.value,themeList[selectValue.value])
      .then(async (response) => {
        console.log(response)
        const result = await response.json();
        if (response.status === 200) {
          closePopup();
          refresh();
        } else {
          this.error = result.message;
        }
      });
  }
}

</script>

<style scoped>
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.vue-modal-inner {
  margin: 2rem auto;
  width: 40%;
}

.vue-modal-content {
  background-color: #303338;
  color: #7a7b80;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  text-align: center;
  color: white;
}

@media (max-width: 1000px) {
  .login-box {
    width: 100%;
  }
}

.add-user-box {
  margin-top: 20px;
  margin-left: 5%;
  text-align: left;
}

.add-user-box input[type="text"] {
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  color: white;
  background-color: #1e1f22;
  margin-top: 10px;
  border: none;
  border-radius: 3px;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1000px) {
  .login-box input[type="text"],
  .login-box input[type="password"] {
    width: 95%;
  }
}
.add-user-box label::after {
  content: "*";
  color: red;
}
.button {
  width: 40%;
  padding: 10px;
  margin: 20px;
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

@media (max-width: 1200px) {
  .button {
    width: 70%;
  }
}
</style>
