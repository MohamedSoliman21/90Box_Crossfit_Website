import {Schema, model, Document} from "mongoose";

export interface ITeam extends Document {
    Name: {
        type: String,
        required: true
    },
    Title : {
       type: String,
       required: true
    },
    ArabicName: {
        type: String,
        required: true
    },
    ArabicTitle : {
       type: String,
       required: true
    },
    Image: String | {
        data: String,
        required: true
    }
}
const TeamSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Title : {
       type: String,
       required: true
    },
    ArabicName: {
        type: String,
        required: true
    },
    ArabicTitle : {
       type: String,
       required: true
    },
    Image: {
        type: String,
        required: true
    }
});

export default model<ITeam>("team", TeamSchema);