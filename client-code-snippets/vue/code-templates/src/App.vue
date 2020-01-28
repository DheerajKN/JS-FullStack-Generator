<template>
  <div id="app">
    <img :src="logo" alt="Logo" />
    <h1 v-if="username === ''">Loading.. please wait!</h1>
    <h1 v-else>Hello there, is it {{ username }}</h1>
  </div>
</template>

<script>
import logo from "./assets/logo.png";
export default {
  name: "App",
  data() {
    return {
      logo,
      username: ""
    };
  },
  mounted() {
    fetch("/api/getUsername")
      .then(res => res.json())
      .then(user => (this.username = user.username));
  }
};
</script>

<style lang="css" src="./style.css" />
