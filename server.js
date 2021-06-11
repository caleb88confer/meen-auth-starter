//DEPENDANCIES========================================
require('dotenv').config();
const express = require('express');
const mongoose  = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const session = require('express-session');
//DATABASE CONFIGURATION=============================
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, 
    useCreateIndex: true,
});

//DATABASE CONNECTION ERROR/SUCCESS
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


//MIDDLEWARE=========================================
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));
app.use(methodOverride('_method'));
//ROUTES/CONTROLLERS=================================
//this allows us to drop the /users from all of our routes in the controller module. (users.js)
const userController = require('./controllers/users');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

app.get('/', (req, res) => {
    if(req.session.currentUser) {
        res.render('dashboard.ejs', {
            currentUser: req.session.currentUser
        });
    } else {
        res.render('index.ejs', {
            currentUser:req.session.currentUser
        });
    }
});
//LISTENER============================================
const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server is listening on port:', PORT));
