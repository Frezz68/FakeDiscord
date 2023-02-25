<script setup>
const props = defineProps({
  message: {
    type: Object,
  }
})
</script>

<template>
<span> {{ message.content.Text }} </span><br>
</template>



<style scoped>

</style>