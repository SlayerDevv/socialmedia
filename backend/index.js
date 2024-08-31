require("dotenv").config();
const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const Connect = require('./utils/db')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const tokenRouter = require('./routes/token')
const postRouter = require('./routes/post')
const fileRouter = require('./routes/file')
const {auth} = require('./middleware/authentication')
const cors = require('cors')

app.use(cors({
    origin: `http://${process.env.HOST}:3000`,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', auth,userRouter);
app.use('/api/v1/token', tokenRouter);
app.use('/api/v1/posts', auth,postRouter);
app.use('/api/v1/files', auth,fileRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res, next) => {
    res.send('Hello, World!')
})

const start = async(port) => {
   await server.listen(port, () => {
        console.log(`Server running at http://${process.env.HOST}:${port}`);
    });
}
Connect(process.env.DB_URL)
start(5000)