const mongo = require('mongoose');

const taskSchema = new mongo.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: 'pendente',
    },
    userId: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

}, {timestamps: true});

const Task = mongo.model('Task', taskSchema);

module.exports = Task;