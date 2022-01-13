import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  task: { type: String, required: true },
});

export default mongoose.model('Todo', TodoSchema);
