/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 15/08/12
 * Time: 19:04
 */



var ProjectSchema = new Schema({
    name : {type: String, default: '', trim: true}

})

Mongoose.model('Project', ProjectSchema)