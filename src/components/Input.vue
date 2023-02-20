<script>
export default {
    data() {
        return {
            message: '',
            file: null
        }
    },
    methods: {
        sendMessage() {
            // Envoyer le message avec la photo
            // `this.message` est le message à envoyer
            // `this.file` est la photo sélectionnée (s'il y en a une)
            // Réinitialiser les valeurs du champ de texte et de la photo
            this.message = 'TEST'
            this.file = null
        },
        openFileUpload() {
            this.$refs.fileInput.click()
        },
        handleFileUpload(event) {
            // Gérer la sélection de la photo
            this.file = event.target.files[0]
        }
    }
}

</script>

<template>
    <div class="message-input">
        <input type="text" placeholder="Envoyer un message..." v-model="message" @keyup.enter="sendMessage">
        <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;">
        <button class="attach-button" @click="openFileUpload">
            <i class="fa fa-paperclip"></i>
        </button>
        <button class="send-button" @click="sendMessage">
            <i class="fa fa-paper-plane"></i>
        </button>
    </div>
</template>

<style>
.message-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #303034;
    width: 60%;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 43%;
    margin-bottom: 1%;
}

.message-input input[type="text"] {
    flex: 1;
    border: none;
    background-color: #434040;
    font-size: 16px;
    padding: 10px;
    border-radius: 20px;
    margin-right: 10px;
    outline: none;
    color: black
}

.message-input input[type="file"] {
    display: none;
}

.message-input .attach-button {
    background-color: transparent;
    border: none;
    font-size: 20px;
    color: #272424;
    cursor: pointer;
}

.message-input .send-button {
    background-color: #7289da;
    border: none;
    color: #343030;
    font-size: 20px;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
}

.message-input .send-button:hover {
    background-color: #677bc4;
}

</style>