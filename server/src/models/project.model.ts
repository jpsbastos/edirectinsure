import * as mongoose from 'mongoose';
import { TaskSchema } from './task.model';

const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },
    userId: {
        required: false,
        type: Schema.Types.ObjectId
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref:'Task' }],
});