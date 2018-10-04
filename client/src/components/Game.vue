<template>
<div class="game">
    <h1>Game</h1>
    <h2 v-if="this.winner">The winner is: {{ this.winner }}</h2>
    <h2 v-if="this.tie">Game is tied!</h2>
    <h2 v-if="!this.symbol">Waiting for player to join</h2>
    <h3 v-if="this.symbol">Players:</h3>
    <div>
      <span v-for="player in players" v-bind:key="player.nick">
        {{ player.nick }}: <i>{{ player.mark }}</i>
      </span>
    </div>
    <checkerboard v-if="this.symbol" :symbol="symbol" :room="room"></checkerboard>
    <br>
    <router-link :to="{name: 'Main'}"><button @click="leaveRoom">Back</button></router-link>
</div>
</template>

<script>
import Checkerboard from '@/components/Checkerboard'

export default {
  name: 'game',
  components: {
    checkerboard: Checkerboard
  },
  data () {
    return {
      userName: this.$route.params.userName,
      players: {},
      room: this.$route.params.room,
      symbol: '',
      winner: '',
      tie: false
    }
  },
  mounted () {
    if (!this.room || !this.userName) {
      this.$router.replace('/')
    }
  },
  created () {
    let userName = this.userName
    this.$socket.emit('join-room', this.room, userName)
  },
  methods: {
    leaveRoom () {
      console.log(`leaving room ${this.room}`)
      this.$socket.emit('leaveRoom', this.room)
    }
  },
  sockets: {
    symbolFromServer (symbol) {
      this.symbol = symbol
      console.log(`Got symbol: ${symbol}`)
    },
    roomPlayers (players) {
      this.players = players
    },
    annouceWinner (winner) {
      this.winner = winner
    },
    annouceTie () {
      this.tie = true
    }
  }
}
</script>

<style>
</style>
