<template>
<div class="main">
  <h1>Main</h1>
  <input v-model="userName" autocomplete="off" type="text" name="username" id="username" placeholder="username"><br><br>  
  <input v-model="room" autocomplete="off" type="text" name="room" id="room" placeholder="room"><br><br>  
  <router-link
    :to="{ name: 'game', params: { 
        userName: userName,
        room: room
        }}"
  >
    <button>Let's Play!</button>
  </router-link>
</div>
</template>

<script>
export default {
  name: 'mainEl',
  data () {
    return {
      userName: '',
      room: ''
    }
  }
}
</script>

<style>
</style>
