import {Schema, model, Document} from "mongoose";

export interface ITestimonial extends Document {
    Name : {
        type: String,
        required: true
    },
    Content : {
        type: String,
        required: true,
    },
    ArabicName : {
        type: String,
        required: true
    },
    ArabicContent : {
        type: String,
        required: true,
    },
    Image: String | {
        type: String,
        required: true,
    }
}

const testimonialSchema = new Schema({
    Name : {
       type: String,
       required: true
    },
    Content : {
        type: String,
        required: true,
    },
    ArabicName : {
        type: String,
        required: true
    },
    ArabicContent : {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    }
});

export default model<ITestimonial>("testimonial", testimonialSchema);