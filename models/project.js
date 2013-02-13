/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 15/08/12
 * Time: 19:04
 */



var ProjectSchema = new Schema({
    code        : {type : String, default : '', trim : true},
    name        : {type: String, default: '', trim: true},
    created_by  : {type : Schema.ObjectId, ref : 'User'},
    created_at  : {type : Date, default : Date.now}
})

Mongoose.model('Project', ProjectSchema)