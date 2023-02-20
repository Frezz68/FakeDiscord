<script setup>

</script>

<template>
	<div class="text-panel">
    <input type="text" class="text-input" placeholder="Envoyer un message dans #nomduchannel">
    <button type="submit" class="send-content"><img src="../assets/icons8-envoyer-48.png"/></button>
	</div>
</template>

<style scoped>
.text-panel {
  align-items: center;
  position: fixed;
  width: 700px;
  background-color: #303338;
  /* background-color: yellow; */
  height: 100px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-input {
  width: 80%;
  height: 50%;
  padding: 0 10px;
  border-radius: 50px;
  border: none;
  background-color: #4c4e51;
  color: #8b8383;
  font-size: 16px;
  outline: none;
}

.send-content {
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
</style>