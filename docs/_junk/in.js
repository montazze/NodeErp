/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 27/08/12
 * Time: 22:43
 */


// Don't care much about inheritance at this point, but I'll probably attempt it at
// some point via cloning ancestor schema's

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Contact = new Schema({
    _type: String,
    name: String
});

var Person = new Schema({
    _type: {type: String, default: 'Person'},
    name: {
        first: String,
        last: String
    }
});

var Company = new Schema({
    _type: {type: String, default: 'Company'},
    name: String
});

Contact.methods.iam = function() { return 'Base'; };
Company.methods.iam = function() { return 'Company'; };
Person.methods.iam = function() { return 'Person'; };

var Base = mongoose.model('Contact', Contact, 'contacts');
var exports = module.exports = Base;
Base.Person = mongoose.model('Person', Person, 'contacts');
Base.Company = mongoose.model('Company', Company, 'contacts');

// Monkey path inheritance, seems to work

var init = Base.prototype.init;
init.Person = new Base.Person().__proto__;
init.Company = new Base.Company().__proto__;
Base.prototype.init = function (doc, fn) {
    var obj = init.apply(this,arguments);
    obj.__proto__ = init[doc._type];
    return obj;
};