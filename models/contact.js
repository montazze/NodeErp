/**
 * Company: OfficeSoft
 * User: steve mangelschots
 * Date: 11/08/12
 * Time: 21:10
 */
// contact schema

var ContactSchema = new Schema({
    name        : {type : String, default : '', trim : true},
    surname     : {type : String, default : '', trim : true},
    street      : {type : String, default : '', trim : true},
    country     : {type : Schema.ObjectId, ref : "Country"},
    created_by  : {type : Schema.ObjectId, ref : 'User'},
    created_at  : {type : Date, default : Date.now}
})



// contact validation
ContactSchema.path('name').validate(function (name) {
    return name.length > 0
}, 'Contact name cannot be blank')



// Contact creation
Mongoose.model('Contact', ContactSchema)
