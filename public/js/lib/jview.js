/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 27/05/13
 * Time: 11:12
 */

function jview(name){

    this.name = name;

    this.column = function(){
        this.row = '';
        this.headerText = '';
        this.hidden = 0;
        this.controlType = 'textbox';
    }

    this.addColumn = function(column){
        this.columns.push(column)
    }

     this.viewModel = function(config){
         this.data = config.data;
         this.columns = [];
     }


}

jview.prototype.load = function(){



    var mainTemplate =
        "<div class='contactEditContainer'>" +
            "<div class='widgetPanel'>" +
                "<div class='widgetHead'>" +
                    "<h2>New Contact</h2>" +
                "</div>" +
                "<div class='widgetContent'>" +
                    "<form method='post' action='/contact'>" +
                        "<fieldset>" +
                            "<ul>" +
                                "<li>" +
                                    "<div class='widgetRow80'>" +
                                        "<label>Name:</label>" +
                                        "<input type='text' data-bind='value: contact.name' name='name' class='round'>" +
                                    "</div>" +
                                "</li>" +
                                "<li>" +
                                    "<div class='widgetRow80'>" +
                                        "<label>Surname:</label>" +
                                        "<input type='text' name='surname' class='round'>" +
                                    "</div>" +
                                "</li>" +
                                "<li>" +
                                    "<input type='submit' value='Submit'>&nbsp;" +
                                    "<input type='submit' value='Cancel'>" +
                                "</li>" +
                            "</ul>" +
                        "</fieldset>" +
                    "</form>" +
                "</div>" +
            "</div>" +
        "</div>"


    $('[name=' + this.name + ']').append(mainTemplate);
};

function sowDetail(){

}



