import { Schema,model,models } from "mongoose";

const UserSchema = new Schema(
{
    email:{
        type: String,
        unique:[true,'Email already exists'],
        required:[true,'Email is Required!']
    },
    username:{
        type: String,
        unique: [true,'UserName already exists!'],
        required:[true,'UserName is Required!']
    },
    image:{
        type: String
    },
    bookmarks:[{
            type: Schema.Types.ObjectId,
            ref:'Property'
        }],
    },{
        timestamps:true
    });
    const User = models.User || model('User',UserSchema);
    export default User;