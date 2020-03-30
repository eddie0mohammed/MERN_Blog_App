
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const authRouter = require('./routes/auth');
const articlesRouter = require('./routes/articles');



const app = express();


//DB
const DB = process.env.DB;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.log('successfully connected to DB');
})
.catch(err => {
    console.log(err);
});


//MIDDLEWARES
app.use(cors());
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());


//Serve Static File
app.use('/images' , express.static(path.join(__dirname, 'public', 'images')));

//ROUTES
app.use('/auth', authRouter);
app.use('/articles', articlesRouter);



const PORT = 8080;
app.listen(PORT, () => {
    console.log('server listening on port ', PORT);
});