/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 13/02/13
 * Time: 20:45
 */

$(function(){


    nerp.Application = function(){
        var self = this;
        self.username = ko.observable();

    };


    nerp.vm = function(){


        appViewModel = ko.observable(null),



        loadApplication = function(){

        }


        return{
            appViewModel: appViewModel,
            loadApplication: loadApplication

        }
    }();


    nerp.vm.loadApplication();
   // ko.applyBindings(nerp.appvm);
});