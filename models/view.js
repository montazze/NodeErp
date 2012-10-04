/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 21/09/12
 * Time: 22:28
 */


var ViewSchema = new Schema({
    name : {type : String, default : '', trim : true}
})

Mongoose.model('View', ViewSchema)