import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    user_email: {type: String},
});

export default mongoose.model('User', UserSchema);