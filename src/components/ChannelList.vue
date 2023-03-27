<script setup>
import {reactive} from "vue";
import {ServiceChannel} from "../service/ServiceChannel";
import {useRouter} from "vue-router";

/*let channels = reactive([])
const initChannel = async () => {
  const response = await ServiceChannel.getAllChannel()
  const result = await response.json();
  if (response.status === 200) {
    for (let channel of result){
      channels.push(channel)
    }
    console.log(channels)
  }
}

initChannel();
*/
const props = defineProps({
  channels: {
    type: Object,
  }
})
</script>
<template>
  <div class="left-panel">
    <h3>Channels <Button class="addChann">+</Button></h3>
    <hr>
    <ul v-for="channel of channels">
        <RouterLink :to="`/channels/${channel.id}`"><li><img :src="channel.img"> {{ channel.name }}</li></RouterLink>
      

    </ul>
  </div>
</template>

<style scoped>
.left-panel {
  position: fixed;
  flex-basis: 150px;
  flex-direction: column;
  top: 0;
  left: 0;
  bottom: 0;
  width: 150px;
  background-color: #554949;
  overflow:hidden;
}
.left-panel h3 {
  text-align: center;
  border-radius: 20px;
  margin: 10px;
  margin-bottom: 10px;
  padding: 5px;
  color: #554949;
  background-color: #D9D9D9;
}
.left-panel ul {
  list-style: none;
  text-align: left;
  padding: 3px;
}
.left-panel ul a {
  text-decoration: none;
  color: unset;
}
.left-panel li {
  line-height: normal;
  color: #554949;
  background-color: #D9D9D9;
  font-weight: bold;
  padding-left: 15px;
  padding-right: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  font-size: 14px;
  text-align: left;
  margin: 5px 8px;
}

.left-panel ul li:hover {
  background-color: #303338;
  color: #D9D9D9;
}

.left-panel ul li img {
  height: 15px;

}

hr {
  margin: 5px 13px;
  background-color: #D9D9D9; 
  height: 1.25px;  
}

.addChann {
  background-color: transparent; 
  color: #554949; 
  border: transparent; 
  border-radius: 30px;
  /* margin-left:2px;  */
  font-size: 15px; 
  font-weight: bold;
  padding: 3px;
  margin: 3px;
}

.left-panel ul li:hover, .left-panel h3:hover {
  background-color: #303338;
  color: #D9D9D9;
  transition-duration: 0.5s;
}
</style>