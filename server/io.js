const { randomizeSymbol } = require('./functions/xo')
const { checkFields } = require('./functions/xo')

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      console.log(socket.id + ' disconected')
    })

    //assign room instance to variable
    var roomData = io.sockets.adapter.rooms   

    socket.on('join-room', (roomName, userName) => {
      socket.join(roomName)

      //creating game obj if not exist
      if(!roomData[roomName].game) {
        roomData[roomName].game = {
          players: {},
          moves: 0,
          fields: {}
        }
      }

      //adding new player to
      roomData[roomName].game.players[socket.id] = {
        nick: userName,
        mark: ''
      }

      //checking number of players
      io.in(roomName).clients((error, clients) => {
        if ( error ) throw error
        let symbols = randomizeSymbol()
        if (clients.length >= 2) {
          for (let i = 0; i <= 1; i++) {
            io.to(clients[i]).emit('symbolFromServer', symbols[i])
            roomData[roomName].game.players[clients[i]].mark = symbols[i]
          }
          console.log(roomData[roomName].game.players)
          io.in(roomName).emit('roomPlayers', roomData[roomName].game.players)
        }
      })     
    })

    //deleting player from room after leave
    socket.on('leaveRoom', (roomName) => {
      console.log(socket.id + ' deleted from room after leave')
      if(roomData[roomName]) delete roomData[roomName].game.players[socket.id]      
      socket.leave(roomName)
     })

     //sending fields between players
    socket.on('sendFields', (fields, roomName) => {
      let gameObj = roomData[roomName].game
      gameObj.moves++
      gameObj.fields = fields
      socket.to(roomName).emit('receiveFields', fields)
      if (gameObj.moves >= 5) {
        let winner = checkFields(gameObj.fields)
        if ( winner ) {
          io.in(roomName).emit('freezePlayers')
          io.in(roomName).emit('annouceWinner', winner)
        }
      }
    })
  })
}

