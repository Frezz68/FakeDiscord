<template>
    <div class="login-container">
        <div class="panneau">
            <div class="login-box">
                <h2>Ha, te revoilà !</h2>
                <h4>Nous sommes si heureux de te revoir !</h4>
                <label for="user">Nom d'utilisateur :</label>
                <input v-model="username" placeholder="Username" type="text" id="user" required><br>
                <label for="password">Mot de passe :</label>
                <input v-model="password" placeholder="password" type="password" id="password" required><br>
                <button v-on:click="login">Log In</button>
            </div>
            <div class="QRCode-box">

            </div>
        </div>
        
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
            if(this.username.trim() !== "" && this.password.trim() !== "") {
            ServiceUtilisateur.login(this.username, this.password)
            .then(async (response) => {
                const result = await response.json();
                if(response.status === 200) {
                  localStorage.setItem("token", result.token)
                  this.$router.push({ path: '/home' })
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
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.panneau {
    background-color: #303338;
    color: #7a7b80;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    max-width: 50%;
    width: 90%;
}

.login-box {
    display: inline-block;
    width: 60%;
    vertical-align: top; 
}

h2 {
    text-align: center;
    color: white;
}

h4 {
    text-align: center;
}
.login-box input[type="text"],
.login-box input[type="password"] {
    width: 80%;
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 3px;
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.login-box input[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: #5765f2;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-box input[type="submit"]:hover {
    background-color: #3e8e41;
}


.QRCode-box {
    display: inline-block;
    width: 40%;
    vertical-align: top; 
}


</style>