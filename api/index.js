import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';
import uploadRouter from './routes/upload.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware/authMiddleware.js';

import path from 'path'


dotenv.config();

const uri = process.env.MONGOURL;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(uri, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (error) {
console.log('====================================');
console.log(error);
console.log('====================================');
    } 
    // finally {
    //   // Ensures that the client will close when you finish/error
    //   await mongoose.disconnect();
    // }
  }
  run().catch(console.dir);

  const __dirname = path.resolve();

const app = express();
app.use(cookieParser());
app.use(express.json())
app.listen(3000, () => {
    console.log('====================================');
    console.log("Server is running on port 3000 !!!!");
    console.log('====================================');
});

app.use('/api/user',authMiddleware, userRouter)
app.use('/api/auth', authRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/listing', listingRouter)
app.use(express.static(path.join(__dirname,'/client/dist' )));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success:false,
    message,
    statusCode
  })
}) 