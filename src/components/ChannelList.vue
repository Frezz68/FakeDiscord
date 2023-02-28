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
    <h3>Channels</h3>
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
  background-color: #1e1f22;
}
.left-panel h3 {
  text-align: center;
  border-radius: 5px;
  box-shadow: 1px 0 5px 1px #252525;
  margin-top: 3px;
  margin-left: 2px;
  margin-bottom: 20px;
  padding: 2px;
  background-color: #303338;

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
.left-panel ul li {
  line-height: normal;
  padding-left: 15px;
  padding-top: 3px;
  margin-top: 5px;
  border-radius: 20px;
  height: 30px;
  font-size: 20px;

}


.left-panel ul li img {
  height: 15px;

}

li:hover {
  background-color: #303338;
}
</style>