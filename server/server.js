const app = require('express')()
const cors = require('cors')
const http = require('http').Server(app)
const io = require('socket.io')(http)

var port = process.env.PORT || 8000

app.use(cors())

require('./routes')(app) //routes
require('./io')(io) //socket.io code

http.listen(port, () => {
  console.log(`listening on :${port}`)
})
