import mongoose,{Schema} from 'mongoose'

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email id is required"],
        unique:[true, "Email is already exists"]
    },
    phone:{
        type:Number,
        required:[true, "Phone number is required"],
        unique:[true, "Phone number is already exists"]
    }
})


const User = mongoose.model('User' , userSchema)

export default User;