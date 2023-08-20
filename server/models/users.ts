import {Schema, model, Document} from "mongoose";

export interface IUser extends Document {
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password : string
}
const UserSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password : {
       type: String,
       required: true
    }
});

export default model<IUser>("user", UserSchema);