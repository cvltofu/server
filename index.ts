import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRouter from './routes/auth-router';
import postsRouter from './routes/post-router';
import todosRouter from './routes/todos-router';
import errorMiddleware from './middlewares/error-middleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.options('*', cors());
app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);
app.use('/api/posts', postsRouter);
app.use(errorMiddleware);

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
