<script setup>
import Msg from "@/components/Message.vue"
import Prompt from "@/components/ChatPrompt.vue"
</script>
<template>
    <div class="channel">
        chan
        <div class="msgContent">
            <Msg></Msg>
        </div>
        <div class="input">
            <Prompt></Prompt>
        </div>
    </div>
</template>
<style scoped>
.channel {
    width: 100%;
}

.msgContent {
    width: 30%;
    height: 80%;
    margin-left: auto;
    margin-right: auto;
}


</style>