const express = require('express');
const path = require('path');

const app = express();  
const PORT = process.env.USER_PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

const server = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('message', (message) => { // 'message' is an event
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`); // emit broadcasts to all connected sessions
  });
});
