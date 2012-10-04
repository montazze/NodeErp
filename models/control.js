/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 21/09/12
 * Time: 22:27
 */

ControlTypeEnum = {
    TextBox : 'TextBox'

}

var ControlSchema = new Schema({
    name : {type: String, default: '', trim: true},
    type : { type: String , default: ControlTypeEnum.TextBox, trim: true}
})

Mongoose.model('Control',ControlSchema)