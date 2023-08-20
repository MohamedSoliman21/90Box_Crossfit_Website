import {Schema, model, Document} from "mongoose";

interface IPrivacy extends Document {
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

const privacySchema = new Schema({
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


export default model<IPrivacy>("privacy", privacySchema);