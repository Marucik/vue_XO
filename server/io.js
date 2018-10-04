const { randomizeSymbol } = require('./functions/xo')
const { checkFields } = require('./functions/xo')
let allConnections = []

module.exports = (io) => {
  io.on('connection', (socket) => {
    allConnections.push(socket.id)
    socket.on('disconnect', () => {
      console.log(socket.id + ' disconected')
      let index = allConnections.indexOf(socekt.io);
      delete allConnections[index];
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

      //adding new player to game obj
      roomData[roomName].game.players[socket.id] = {
        nick: userName,
        mark: ''
      }

      //checking number of players
      io.in(roomName).clients((error, clients) => {
        if ( error ) throw error
        let players = roomData[roomName].game.players;
        let symbols = randomizeSymbol()
        if (clients.length >= 2) {
          symbols.forEach((symbols, index) => {
            io.to(clients[index]).emit('symbolFromServer', symbols)
            players[clients[index]].mark = symbols
          });
          console.log(players)
          io.in(roomName).emit('roomPlayers', players)
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
        if ( !winner && gameObj.moves >= 9) {
          io.in(roomName).emit('freezePlayers')
          io.in(roomName).emit('annouceTie')
        }
      }
    })
  })
}

