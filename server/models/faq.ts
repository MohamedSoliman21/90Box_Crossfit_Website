import {Schema, model, Document} from "mongoose";

interface IFaq extends Document {
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

const faqSchema = new Schema({
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


export default model<IFaq>("faq", faqSchema);