import {Schema, model, Document} from "mongoose";

export interface IPrograms extends Document {
    Title : {
       type: String,
       required: true
    },
    Description: {
        type: String,
        required: true
    },
    ArabicTitle: {
        type: String,
        required: true
    },
    ArabicDescription: {
        type: String,
        required: true
    },
    Image: String | {
        type: String,
        required: true,
    }
}
const ProgramsSchema = new Schema({
    Title : {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    ArabicTitle: {
        type: String,
        required: true
    },
    ArabicDescription: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true,
    }
});

export default model<IPrograms>("programs", ProgramsSchema);