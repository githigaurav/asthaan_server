import mongoose, {Schema} from "mongoose";

const propertySchema = new mongoose.Schema({
    propertyName:{
        type:String,
        required:[true , "Property name is required"],
        trim:true,
    },
    listingType:{
        type:String,
        required:["true","Listing type is required"],
        enum:["Sale", "Rental"],
        default:"Rental"
    },
    propertyType:{
        type:String,
        required:[true,"Property type is required"],
        enum:["Residential","Commercial"],
        default:"Residential"
    },
    buildingType:{
        type:String,
        trim:true,
        required:[true, "Building type is required"]
    },
    view:{
        type:String,
        trim:true,
        required:[true, "View is required"]
    },
    facingDirection:{
        type:String,
        trim:true,
        required:[true, "Facing is required"]
    },
    plotNo:{
        type:Number,
        required:[true,"Plot / House number is required"]
    },
    loanAvailability:{
        type:Boolean,
        required:[true, "Loan availability is required"]
    }, 
    amenities:{
        type:[String],
        required:[true, "amenities is required"],
        default:[]
    },
    images:{
        type:[String],
        required:[true,"Property images are required"],
        default:[]
    },
    area:{
        type:Number,
        required:[true,"Area is required"]
    },
    price:{
        type:Number,
        required:[true, "Price is required"]
    },
    city:{
        type:String,
        trim:true,
        required:[true,"City is required"]
    },
    locality:{
        type:String,
        trim:true,
        required:[true, "Locality is required"]
    },
    owner:{
        type:String,
        required:[true, "User id is required"],
    }
},
{timestamps:true},
{collection:"property"}
)


const Property = mongoose.model("Property", propertySchema)

export default Property;