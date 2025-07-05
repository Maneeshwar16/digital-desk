import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['task', 'article', 'youtube', 'image'],
    default: 'task',
  },
  taskName: {
    type: String,
    required: function() { return this.type === 'task'; },
    trim: true
  },
  taskDescription: {
    type: String,
    trim: true
  },
  content: {
    type: String, // for article text, links, or YouTube URLs
    trim: true
  },
  imageUrl: {
    type: String, // for image links
    trim: true
  },
  done: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo; 