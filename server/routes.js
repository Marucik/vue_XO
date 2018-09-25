const { rndPly } = require('./functions/xo')

module.exports = (app) => {  
  app.get('/', function(req, res) {
    res.send("Gitara hola")
  })

  app.get('/rnd', function(req, res) {
    res.send(rndPly())
  })  
}
