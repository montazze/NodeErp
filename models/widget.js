/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 21/09/12
 * Time: 22:26
 */



var WidgetSchema = new Schema({
    name : {type : String, default : '', trim : true}


})

Mongoose.model('Widget',WidgetSchema)