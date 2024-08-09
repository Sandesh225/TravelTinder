import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
},
password: {
  type: String,
  required: true,
  select:false
},
profile: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Profile',
},
travelPreferences: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'TravelPreference',
},
matches:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Match'
}]
},
{timestamps:true})

userSchema.pre("save",async function(next){
  if (!this.isModified('password')){
    next();
  }
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt);
  next();
})
const User = mongoose.model('Users', userSchema);
export {User}