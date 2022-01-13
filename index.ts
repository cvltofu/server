import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './routes/auth-router';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());
app.use('/api', router);

async function startApp() {
  try {
    await mongoose.connect(
      process.env.DB_URL
      //  {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //  }
    );
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
