const express = require('express');
const path = require('path');
// const ctlr = require('./controller');


const app = express();  
const PORT = process.env.USER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Listeners:
// app.get('/api', ctlr.getData);
// app.post('/api', ctlr.postData);
// app.put('/api', ctlr.updateData);
// app.delete('/api', ctlr.deleteData);

app.use(express.static(path.join(__dirname, '../client/dist')));

const server = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  }); //message is an event
});
