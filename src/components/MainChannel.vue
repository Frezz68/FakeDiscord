<script setup>
import Msg from "@/components/Message.vue"
import Prompt from "@/components/ChatPrompt.vue"
</script>
<template>
    <div class="channel">
        chan
        <Msg></Msg>
        <Prompt></Prompt>
    </div>
</template>
<style scoped>
.channel {
    width: 1000vh;
}
</style>