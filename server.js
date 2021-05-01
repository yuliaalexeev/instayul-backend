const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
//const io = require('socket.io')(http);

// Express App Config
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'CaSep2020 Secret Token 3287323',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3050', 'http://localhost:3050'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const postRoutes = require('./api/post/post.routes')
const userRoutes = require('./api/user/user.routes')
//const authRoutes = require('./api/auth/auth.routes')
//const connectSockets = require('./api/socket/socket.routes')


// routes
app.use('/api/post', postRoutes)
app.use('/api/user', userRoutes)
//app.use('/api/auth', authRoutes)
//connectSockets(io)

// app.get('/**', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

const logger = require('./services/logger.service')
const port = process.env.PORT || 3050;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});