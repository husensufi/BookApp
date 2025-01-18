import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'


import bookRoute from './route/book.route.js'
import userRoute from './route/user.routes.js'
  
  
const app = express();
app.use(cors())

//creating a middleware
app.use(express.json())



dotenv.config();

const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI; 
// connect to mongoDB
try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to mongoDB");
} catch (error) {
  console.log("Error: ", error);
}

//Define a route

app.use('/book', bookRoute)
app.use('/user',userRoute)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});