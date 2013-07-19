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

        nerp.vmcontacts = function(){

            this.contacts = ko.observableArray([]);
            this.contact = new nerp.Contact();

            this.loadContactsCallback = function(json){
               $.each(json,function(i,p){
                    contacts.push(new nerp.Contact()
                        .id(p._id)
                        .name(p.name)
                        .surname(p.surname)
                        .street(p.street)
                        .country(p.country)
                   );
               });
            }

            this.loadContacts = function(){
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


            var grid = new jgrid("contacts");

            grid.viewModel({
                data: this.contacts,
                tableHeaderText: "Contacts",
                tableSearchText: "Search:",
                tableSearchPlaceholderText: "type here...",
                pageSize: 4
            });

            var c1 = new grid.column();
            c1.row = "selection";

            var c2 = new grid.column();
            c2.row = "edit";
            c2.headerText = "edit";

            var c3 = new grid.column;
            c3.row = "id";
            c3.headerText = "id";
            c3.hidden = 1;

            var c4 = new grid.column();
            c4.row = "name";
            c4.headerText = "Name";

            var c5 = new grid.column();
            c5.row = "surname";
            c5.headerText = "Surname";

            var c6 = new grid.column();
            c6.row = "street";
            c6.headerText = "Street";

            grid.addColumn(c1);
            grid.addColumn(c2);
            grid.addColumn(c3);
            grid.addColumn(c4);
            grid.addColumn(c5);
            grid.addColumn(c6);

            var view = new jview("contact");

            view.viewModel({
               data: this.contact
            })

            view.addColumn(c1);
            view.addColumn(c2);
            view.addColumn(c3);
            view.addColumn(c4);
            view.addColumn(c5);
            view.addColumn(c6);

            this.showDetails = function(target, event){
                contact.id(target.id());
                contact.name(target.name());
                contact.surname(target.surname());
                contact.street(target.street());
                contact.country(target.country());
            }

            return{

                loadContacts: loadContacts,
                index: grid,
                view: view
            }
        } ();

        nerp.vmcontacts.loadContacts();
        nerp.vmcontacts.index.load();
        nerp.vmcontacts.view.load();

        ko.applyBindings(nerp.vmcontacts);

});










