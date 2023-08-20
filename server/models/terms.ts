import {Schema, model, Document} from "mongoose";

interface ITerms extends Document {
    Title : {
        type: String,
        required: true
     },
    Content : {
        type: String,
        required: true
    },
    ArabicTitle : {
        type: String,
        required: true,
    },
    ArabicContent: {
        type: String,
        required: true
    }
}

const termsSchema = new Schema({
    Title : {
        type: String,
        required: true
     },
    Content : {
        type: String,
        required: true
    },
    ArabicTitle : {
        type: String,
        required: true,
    },
    ArabicContent: {
        type: String,
        required: true
    }
});


export default model<ITerms>("terms", termsSchema);