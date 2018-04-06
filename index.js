var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {

  socket.broadcast.emit(
    'User Connected',
    `A new user ${Date.now()} has connected`)

  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('chat message', 'User Disconnected')
  })

  socket.on('typing', msg => {
    socket.broadcast.emit('typing', msg)
  })

})

http.listen(port, () => {
  console.log('listening on *:3000')
})