<template>
<div class="login-panel">
  <h1>Login</h1>
  <label for="user">Nom d'utilisateur :</label>
  <input v-model="username" placeholder="Username" type="text" id="user"><br>
  <label for="password">Mots de passe :</label>
  <input v-model="password" placeholder="password" type="password" id="password"><br>
  <button v-on:click="login">Log In</button>
</div>
</template>

<script>
import {ServiceUtilisateur} from "../service/ServiceUser";
export default {
    data: () => ({
        username: "",
        password: "",
        error: ""
        }),
    methods: {
        async login(){
          console.log("username", this.username)
          console.log("password", this.password)
            if(this.username.trim() !== "" && this.password.trim() !== "") {
            ServiceUtilisateur.login(this.username, this.password)
            .then(async (response) => {
                const result = await response.json();
                if(response.status === 200) {
                localStorage.setItem("token", result.token)
                } else {
                this.error = result.message;
                }
            });
            }
        }
    }
}
</script>

<style scoped>
.login-panel {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>