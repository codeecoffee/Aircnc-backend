const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors')
//require('.env')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const app= express();
const server= http.Server(app)
const io = socketio(server)



mongoose.connect(`process.env.DB_CONNECTION`,
    {
        useNewUrlParser:true,
        useUnifiedTopology: true, 
    }, () => console.log('DB connected')
)

const connectedUsers = {}

io.on('connection', socket => {

    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id;
})

app.use((req, res, next)=>{
    req.io= io
    req.connectedUsers = connectedUsers 

    return next()
})

//can configure what address can access through params ({origin: 'http://...})
app.use(cors())
//processing json format
app.use(express.json());
//must be after use json
app.use(routes);

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

server.listen(process.env.PORT || 3333, ()=> console.log('Server running!'));