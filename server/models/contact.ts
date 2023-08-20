import {Schema, model, Document} from "mongoose";

interface IContact extends Document {
    Name : {
        type: String,
        required: true
    },
    Email : {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    }
}

const contactSchema = new Schema({
    Name : {
       type: String,
       required: true
    },
    Email : {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    }
});

export default model<IContact>("contact", contactSchema);