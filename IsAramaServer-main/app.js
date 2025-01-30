require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5050;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MongoConnect = 'mongodb+srv://anlaydn11:anıl123@cluster0.8cvqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//Routes
const JobsRoute = require('./router/JobsRoute');
const UserRoute = require('./router/UserRoute');


var store = new MongoDBStore({
  uri: process.env.MongoDB,
  collection: 'mySession',
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  })
);


app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 5 * 60 * 60 * 1000,
    },
    store: store,
  })
);


//Routes
app.use(JobsRoute)
app.use(UserRoute)





async function connectMongoDB() {
  try {
    await mongoose.connect(MongoConnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB bağlantısı başarılı!');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error.message);
    process.exit(1);
  }
}


connectMongoDB();



app.listen(port, () => {
  console.log(`Sunucu ${port}'unda çalışıyor.`);
});
