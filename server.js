const express = require('express');
const app = express();
var cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter')
const bodyparser = require('body-parser');
const {errorHandler , notFound} = require('./middleware/errorHandler')
require('dotenv').config();

mongoose.connect('mongodb+srv://jaywadekar:jaywadekar@cluster0.8p6ea.mongodb.net/ecommerce?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => { console.log("Connected mongoose") })
  .catch((err) => { console.log("Mongoose connection error", err) })
  const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});


app.use(bodyparser.urlencoded({ extended: false }))
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);



app.use(errorHandler);
app.use(notFound);



if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');

  app.get("*", (req, res) => {
   
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      
  })

}
app.listen(port, () => { console.log(`Connection successful at ${port}`) })