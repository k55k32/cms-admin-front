var express = require('express')

var app = express()

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
});

var data = {
  menus: require('./data/menus')
}

app.post('/mock/:type', function(req, res) {
  var type = req.params.type
  var data = require('./data/' + type)
  console.log('mock type: ', type, data)
  res.send(data)
})

module.exports = function(port) {
  app.listen(port, function(err) {
    if (err) {
      console.log(err)
      return
    }
    var uri = 'http://localhost:' + port
    console.log('Mock server Listening at ' + uri + '\n')
  })
}
