const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const database = knex({
    client: 'pg',
    connection: {
      connectString : process.env.DATABASE_URL,
      ssl: true,
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('it is working')})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, database, bcrypt)})
app.post('/register', (req, res) => register.handleRegister(req, res, database, bcrypt))
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, database)})
app.put('/image', (req, res) => {image.handleImage(req, res, database)})

app.listen(process.env.PORT || 3001, ()=> {
    console.log('app is running on port 3001');
})


