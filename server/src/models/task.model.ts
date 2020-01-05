import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
    description: {
        type: String,
        required: 'Enter a description'
    },
    projectId: {
        immutable: true,
        ref: 'Project',
        required: 'Enter a valid project id',
        type: Schema.Types.ObjectId
    },
    status: {
        default: 'todo',
        type: String,
        enum: [ 'todo', 'done'],
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    finish_date: {
        type: Date,
        required: false
    }
});