import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,      
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,      
        trim:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://images.search.yahoo.com/images/view;_ylt=Awr99R5wHrVmxY8R6oqJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2YzMmM2YTVmNDI3ZTdlNDU1NTJmNDA0NzlmNTA2MWExBGdwb3MDMQRpdANiaW5n?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Ddefaul%253Bt%2Bimage%2Bgoogle%2Bperson%26type%3DE210US1274G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D1&w=860&h=609&imgurl=www.pngitem.com%2Fpimgs%2Fm%2F35-350426_profile-icon-png-default-profile-picture-png-transparent.png&rurl=https%3A%2F%2Fprofilepictureimg.blogspot.com%2F2020%2F07%2Fgoogle-default-profile-picture.html&size=43.7KB&p=defaul%3Bt+image+google+person&oid=f32c6a5f427e7e45552f40479f5061a1&fr2=piv-web&fr=mcafee&tt=Google+Default+Profile+Picture+-+profile+picture&b=0&ni=21&no=1&ts=&tab=organic&sigr=OOE1SKjbVYSF&sigb=rtFHX_ASGD3n&sigi=0e4m5ipQU.32&sigt=TlCVhpEFw1pk&.crumb=Vb81KHxM7iN&fr=mcafee&fr2=piv-web&type=E210US1274G0"
    },

},
{timestamps:true}
)
const User =  mongoose.model("User",userSchema);

export default User;