/**
 * Company: OfficeSoft
 * User: steve mangelschots
 * Date: 11/08/12
 * Time: 21:10
 */

var CountrySchema = new Schema({
    name        : {type : String, default : '', trim : true},
    countryCode : {type : String, default : '', trim: true},
    created_by  : {type : Schema.ObjectId, ref : 'User'},
    created_at  : {type : Date, default : Date.now}
})

// country validation
CountrySchema.path('name').validate(function (name) {
    return name.length > 0
}, 'Country name cannot be blank')



// Contact creation
Mongoose.model('Country', CountrySchema)


