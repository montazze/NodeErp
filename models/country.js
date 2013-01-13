/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 25/11/12
 * Time: 18:08
 */


var CountrySchema = new Schema({
    code        : {type : String, default : '', trim : true},
    name     : {type : String, default : '', trim : true},
    created_by  : {type : Schema.ObjectId, ref : 'User'},
    created_at  : {type : Date, default : Date.now}


})



// contact validation
CountrySchema.path('name').validate(function (name) {
    return name.length > 0
}, 'Contact name cannot be blank')



// Contact creation
Mongoose.model('Country', CountrySchema);
