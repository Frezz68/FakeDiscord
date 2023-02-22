<script setup>
const props = defineProps({
  user: {
    name: String
  }
})
</script>

<template>
  <div>
    <span>{{ user }}</span>
  </div>
</template>

<style scoped>

</style>