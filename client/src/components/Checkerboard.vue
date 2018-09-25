<template>
<div class="checkerboard">
    <tile id="1" :symbol="fields[1].mark" @click.native="addSymbol"></tile>
    <tile id="2" :symbol="fields[2].mark" @click.native="addSymbol"></tile>
    <tile id="3" :symbol="fields[3].mark" @click.native="addSymbol"></tile>
    <tile id="4" :symbol="fields[4].mark" @click.native="addSymbol"></tile>
    <tile id="5" :symbol="fields[5].mark" @click.native="addSymbol"></tile>
    <tile id="6" :symbol="fields[6].mark" @click.native="addSymbol"></tile>
    <tile id="7" :symbol="fields[7].mark" @click.native="addSymbol"></tile>
    <tile id="8" :symbol="fields[8].mark" @click.native="addSymbol"></tile>
    <tile id="9" :symbol="fields[9].mark" @click.native="addSymbol"></tile>
</div>
</template>

<script>
import Tile from '@/components/Tile'

export default {
  name: 'checkerboard',
  components: {
    tile: Tile
  },
  props: ['symbol', 'room'],
  data () {
    return {
      canMove: false,
      fields: {
        1: {
          mark: '',
          frozen: false
        },
        2: {
          mark: '',
          frozen: false
        },
        3: {
          mark: '',
          frozen: false
        },
        4: {
          mark: '',
          frozen: false
        },
        5: {
          mark: '',
          frozen: false
        },
        6: {
          mark: '',
          frozen: false
        },
        7: {
          mark: '',
          frozen: false
        },
        8: {
          mark: '',
          frozen: false
        },
        9: {
          mark: '',
          frozen: false
        }
      }
    }
  },
  methods: {
    addSymbol: function (event) {
      if (this.canMove) {
        var id = event.target.id
        var field = this.fields
        if (field[id].frozen) {
          console.log(`tile ${id} not empty`)
          return 0
        }
        field[id].mark = this.symbol
        field[id].frozen = true
        this.$socket.emit('sendFields', this.fields, this.room)
        this.canMove = false
        return 1
      }
    }
  },
  created () {
    if (this.symbol === 'x') { this.canMove = true }
  },
  sockets: {
    receiveFields (fields) {
      this.fields = fields
      this.canMove = true
    },
    freezePlayers () {
      console.log('You are freezed!! XD')
      this.canMove = false
    }
  }
}
</script>

<style scoped>
*{
    box-sizing: border-box;
}
.checkerboard {
    padding: 3px;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    width: 330px;
    height: 330px;
    background-color: dimgrey;
    justify-content: space-around;
    align-content: space-around;
    border-radius: 2%;
}
</style>
