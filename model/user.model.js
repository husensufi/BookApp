import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    }
})

const userModel = mongoose.model("userModel", userSchema);
export default userModel;