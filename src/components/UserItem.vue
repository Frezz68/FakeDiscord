<template>
  <div>
    <span>Hello {{ user }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    id: Number,
    name: String
  }
})
</script>

<style scoped>

</style>