import {Schema, model, Document} from "mongoose";

interface IBot extends Document {
    Question : {
        type: String,
        required: true
     },
    Answer : {
        type: String,
        required: true
    },
    ArabicQuestion : {
        type: String,
        required: true,
    },
    ArabicAnswer: {
        type: String,
        required: true
    }
}

const botSchema = new Schema({
    Question : {
        type: String,
        required: true
     },
    Answer : {
        type: String,
        required: true
    },
    ArabicQuestion : {
        type: String,
        required: true,
    },
    ArabicAnswer: {
        type: String,
        required: true
    }
});

export default model<IBot>("chatbot", botSchema);