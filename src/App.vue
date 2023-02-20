<script setup>
//import HelloWorld from './components/HelloWorld.vue'
import UserList from './components/UserList.vue'
import Tchat from './components/Tchat.vue'
import Input from './components/Input.vue'


</script>

<template>
  <header>


    <div class="wrapper">
      <!--<HelloWorld msg="You did it!" />-->
    </div>
  </header>

  <main>
  <UserList></UserList>
  <!-- <Tchat></Tchat> -->
  <Input></Input>
  </main>
</template>

<style scoped>
/*
header {
  line-height: 1.5;
}


@media (min-width: 1024px) {

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}*/
</style>
