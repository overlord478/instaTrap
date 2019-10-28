const express = require('express')
const app = express();
const path = require('path');
const connectDB = require('./database/db');
const insert = require('./routes/data')
const image = require('./routes/image')
const getimage = require('./routes/getimage');
const cors = require('cors')
const bodyParser = require('body-parser')

//connect to database 
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes config
app.use('/register',require('./routes/Register'));
app.use('/login',require('./routes/Login'));
app.use('/image',require('./routes/Images'));





app.listen(5000,()=>console.log('running in port 5000'))