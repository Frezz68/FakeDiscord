<script setup>
const props = defineProps({
  message: {
    type: Object,
  }
})

const date = new Date(props.message.timestamp);
const dateStr = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+
    " "+date.getHours()+":"+date.getMinutes();
</script>

<template>
  <div class="message-box">
    <h3>{{ message.author }} :</h3><span>{{ dateStr}}</span>
    <br v-if="message.content.Image">
    <p v-if="message.content.Text"> {{ message.content.Text }} </p>
    <img v-else :src="message.content.Image">
  <br>
  </div>
</template>



<style scoped>
.message-box {
  padding: 10px;
  border-top: 2px solid rgba(84, 87, 91, 0.93);
  border-radius: 2px;
  width: 50%;
}
.message-box img {
  max-width: 50%;
}
</style>