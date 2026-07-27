const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  localId: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'inProgress', 'completed', 'cancelled'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  dueDate: { type: Date, default: null },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
