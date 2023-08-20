import {Schema, model, Document} from "mongoose";

interface ICareers extends Document {
    Title : {
        type: String,
        required: true
     },
    ArabicTitle : {
        type: String,
        required: true
    },
    Experience : {
        type: String,
        required: true,
    },
    Certificates: {
        type: Array<String>,
        required: true
    },
    ArabicCertificates: {
        type: Array<String>,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    ArabicDescription: {
        type: String,
        required: true
    }
}

const careersSchema = new Schema({
    Title : {
        type: String,
        required: true
     },
    ArabicTitle : {
        type: String,
        required: true
    },
    Experience : {
        type: String,
        required: true,
    },
    Certificates: {
        type: Array<String>,
        required: true
    },
    ArabicCertificates: {
        type: Array<String>,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    ArabicDescription: {
        type: String,
        required: true
    }
});


export default model<ICareers>("careers", careersSchema);