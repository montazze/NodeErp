/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 12/08/12
 * Time: 10:52
 */

var UserSchema = new Schema({
    name : {type: String, default : '', trim : true }

})

// contact validation
UserSchema.path('name').validate(function (name) {
    return name.length > 0
}, 'user name cannot be blank')


Mongoose.model('User', UserSchema)