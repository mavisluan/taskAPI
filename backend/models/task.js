const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be more than 2 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        default: " "
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },

});

// Create collection and add schema
const Task = mongoose.model('Task', TaskSchema);
module.exports = {Task: Task};

