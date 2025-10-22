const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/connectDB')

const indexRouter = require('./routes/index.router');

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true

}));

app.use(express.json());
app.use('/uploads-image', express.static(path.join(__dirname, 'uploads-image')));


app.use('/', indexRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB().then();
    console.log(`Server running on port ${PORT}`)
});