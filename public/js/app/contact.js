/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 22/09/12
 * Time: 00:20
 */
$(function(){

        nerp.Contact = function(){
            var self = this;
            self.id = ko.observable();
            self.name = ko.observable();
            self.surname = ko.observable();
            self.street = ko.observable();
            self.country = ko.observable();
        };


        nerp.vm = function(){

           contacts = ko.observableArray([]),

           loadContactsCallback = function(json){
               $.each(json,function(i,p){
                    contacts.push(new nerp.Contact()
                        .id(p._id)
                        .name(p.name)
                        .surname(p.surname)
                        .street(p.street)
                        .country(p.country)
                   );

               });

           },

            loadContacts = function(){
                $.ajax({
                            url: "/contact.json",
                            type: "GET",
                            data: ko.toJSON(null),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (json) {
                                loadContactsCallback(json);
                            }
                });
            }
        return{
            contacts: contacts,
            loadContactsCallback: loadContactsCallback,
            loadContacts: loadContacts
        }

        } ();


        nerp.vm.loadContacts();
        ko.applyBindings(nerp.vm);

});











