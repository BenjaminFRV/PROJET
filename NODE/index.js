const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

// WHEN SOMEONE CONNECT TO LOCALHOST:3000 //

io.on('connection', (socket) => {
    console.log('user connected !');
    io.emit('chat message', "user connected");

    // WHEN USER CLOSE THE WINDOW //

    socket.on('disconnect', () => {
        console.log('user disconnected...');
        io.emit('chat message', "user disconnected");
    })

    // WHEN USER SEND A MESSAGE //

    socket.on('chat message', (msg) => {
        console.log('Message: ' + msg);
        io.emit('chat message', "Message: " + msg);
    });
});

// SERVER ON PORT 3000 //

server.listen(3000, () => {
    console.log('Listening on port 3000');
})