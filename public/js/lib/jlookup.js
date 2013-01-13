/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 05/10/12
 * Time: 01:28
 */

$(function(){
    var lookup = new jlookup();
    $('.jlookup').each(function(){
             lookup.add($(this).attr('id'));
        });
});
 var jlookup = function(){

 };
jlookup.prototype = function(){
    var add = function(name){
        $('<input>').attr({
               type: 'text',
               id: name + 'LookupValue',
               readonly: 'true'
           }).appendTo('#' + name)
        $('<button>').prop({
               id: name + 'LookupButton',
               name: 'lookup-click'
           }).appendTo('#' + name);
        $('#' + name + 'LookupButton').html('...')
        $('<input>').attr({
               type: 'hidden',
               id: name + 'LookupId'
           }).appendTo('#' + name);
        $('<div>').attr({
               id: name + 'lookupDialog',
               title: 'test lookup:'
           }).appendTo('#' + name);
        $(document).on("click", "#" + name + "LookupButton",function(){
                 lookupClick(name);
              });
        },
        lookupClick = function(name){
            $("#lookupDialog").dialog({
                                 modal: true,
                                 buttons:{
                                     Ok: function(){
                                         $('#' + name + 'LookupValue').val("test");
                                         $('#' + name + 'LookupId').val("1");
                                         $(this).dialog("close");
                                     },
                                     Cancel: function(){
                                         $('#' + name + 'LookupValue').val("");
                                         $('#' + name + 'LookupId').val("");
                                         $(this).dialog("close");
                                     }
                                 }
                             })
        }



    return{
        add: add,
        lookupClick : lookupClick
    };

}();

