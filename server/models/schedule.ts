import {Schema, model, Document} from "mongoose";

export interface ISchedule extends Document {
    Name: {
        type: String,
        required: true
    }
    Image: String | {
        data: String,
        required: true
    }
}
const ScheduleSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    }
});

export default model<ISchedule>("schedule", ScheduleSchema);