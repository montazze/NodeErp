/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 15/05/13
 * Time: 20:32
 */
(function(){

    nerp.jgrid = {

         viewModel: function(configuration){

            this.data = configuration.data;
            this.columns = configuration.columns;
            this.tableHeaderText = configuration.tableHeaderText;
            this.tableSearchText = configuration.tableSearchText;
            this.tableSearchPlaceholderText = configuration.tableSearchPlaceholderText;
            this.pageSize = configuration.pageSize;

        },

        loadgrid: function(){

        }


    };





})();






nerp.jgrid = function(){





       return{
           add: add
       }
};

nerp.jgrid = function(){

    add = function(name){
        var self = this;
        self.name = name;
    }



    return{
        add: add

    }

};


$(function(){
    var grid = new jgrid();
    $('.jgrid').each(function(){
       grid.add($(this).attr('id'));
    });


})
var jgrid = function() {

    var name;

    add = function(name){
            var self = this;
            self.name = name;
        };

    viewModel  = function(configuration){

       this.data = configuration.data;
       this.columns = configuration.columns;
       this.tableHeaderText = configuration.tableHeaderText;
       this.tableSearchText = configuration.tableSearchText;
       this.tableSearchPlaceholderText = configuration.tableSearchPlaceholderText;
       this.pageSize = configuration.pageSize;

    }

    return {
        add: add,
        viewModel: viewModel
    }
};


templateEngine.addTemplate("ko_jgrid_grid", "\
<div class=\"widgetPanel\">\
<div class=\"widgetHead\">\
<h5 data-bind=\"text: tableHeaderText\"></h5> \
</div>\
<div class=\"widgetContent\">\
<div>\
<div class='jgridFilter'>\
<label data-bind=\"text: tableSearchText \"></label>\
<input type=\"text\" data-bind=\"attr: {placeholder: tableSearchPlaceholderText}\" >\
<div class=\"srch\"></div>\
</div> \
</div>\
<table class=\"jgridTable\" cellspacing=\"0\">\
<thead>\
<tr data-bind=\"foreach: columns\">\
<!-- ko if:(headerText == \"selection\") -->\
<th width='20px' id=\"selectAll\"><input type=\"checkbox\"/></th>\
<!-- /ko -->\
<!-- ko ifnot:(headerText == \"selection\" || headerText == 'title' || headerText == 'id' ) -->\
<th class=\"ui-state-default\" data-bind=\"text: headerText\"></th>\
<!-- /ko -->\
</tr>\
</thead>\
<tbody data-bind=\"foreach: itemsOnCurrentPage\">\
<tr data-bind=\"foreach: $parent.columns\">\
<!-- ko if:(headerText == \"selection\") -->\
<td><input type=\"checkbox\"/></td>\
<!-- /ko -->\
<!-- ko if:(headerText == \"edit\") -->\
<td><input type=\"button\"/></td>\
<!-- /ko -->\
<!-- ko ifnot:(headerText == 'selection' || headerText == 'title' || headerText == 'edit' || headerText == 'id') -->\
<td data-bind=\"text: typeof rowText == 'function' ? rowText($parent) : $parent[rowText] \"></td>\
<!-- /ko -->\
</tr>\
</tbody>\
</table>\
</div>\
</div>");

templateEngine.addTemplate("ko_jgrid_grid", "\
                <div class=\"widgetPanel\">\
                    <div class=\"widgetHead\">\
                        <div class='widgetHeadText'>\
                        <h5 data-bind=\"text: tableHeaderText\"></h5></div>\
                        <div class='widgetHeadActions'><a class='gridAddNew' href='#'><img src='images/plus.png'></a> <a class='gridEdit' href='#'><img src='images/pencil.png'></a> <a class='gridDelete' href='#'><img src='images/cross.png'></a> </div>\
                    </div>\
                    <div class=\"widgetContent\">\
                        <div>\
                           <div class='jgridFilter'>\
                               <label data-bind=\"text: tableSearchText \"></label>\
                               <input type=\"text\" data-bind=\"attr: {placeholder: tableSearchPlaceholderText}\" >\
                               <div class=\"srch\"></div>\
                           </div> \
                        </div>\
                        <table class=\"jgridTable\" cellspacing=\"0\">\
                            <thead>\
                                <tr  data-bind=\"foreach: columns\">\
                                    <!-- ko if:(headerText == \"selection\") -->\
                                    <th width='20px' id=\"selectAll\"><input type=\"checkbox\" style=\"margin-left: -10px;\" /></th>\
                                    <!-- /ko -->\
                                    <!-- ko if:(headerText == \"edit\") -->\
                                    <th class=\"ui-state-default\"  style=\"width: 19px; padding-left: 0px;\"></th>\
                                    <!-- /ko -->\
                                    <!-- ko ifnot:(headerText == \"selection\" || headerText == 'title' || headerText == 'edit' ) -->\
                                    <!-- ko if:(hidden == '0') -->\
                                    <th class=\"ui-state-default\" data-bind=\"text: headerText\"></th>\
                                    <!-- /ko -->\
                                    <!-- ko if(hidden == '1') -->\
                                    <th class=\"ui-state-default\" style='display: none' data-bind=\"text: headerText\"></th>\
                                    <!-- /ko -->\
                                    <!-- /ko -->\
                                </tr>\
                            </thead>\
                            <tbody data-bind=\"foreach: itemsOnCurrentPage\">\
                                <tr data-bind=\"foreach: $parent.columns\">\
                                     <!-- ko if:(headerText == \"selection\") -->\
                                     <td><input type=\"checkbox\"/></td>\
                                     <!-- /ko -->\
                                     <!-- ko if:(headerText == \"edit\") -->\
                                     <td><a class='gridEdit' href=\"#\"><img src=\"/images/pencil.png\"> </a></A></td>\
                                     <!-- /ko -->\
                                     <!-- ko if:(headerText == \"id\") -->\
                                     <td class='rowId' style='display: none' data-bind=\"text: typeof rowText == 'function' ? rowText($parent) : $parent[rowText] \"></td>\
                                     <!-- /ko -->\
                                    <!-- ko ifnot:(headerText == 'selection' || headerText == 'title' || headerText == 'edit' ) -->\
                                    <td data-bind=\"text: typeof rowText == 'function' ? rowText($parent) : $parent[rowText] \"></td>\
                                    <!-- /ko -->\
                                </tr>\
                            </tbody>\
                        </table>\
                    </div>\
                </div>");


templateEngine.addTemplate("ko_jgrid_pageLinks", "\
                <div class=\"widgetFooter\"> \
                    <div class=\"jgridToolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix\">\
                        <div class=\"jgridPageLinks\">\
                            <span>Page:</span>\
                            <!-- ko foreach: ko.utils.range(0, maxPageIndex) -->\
                                   <a href=\"#\" data-bind=\"text: $data + 1, click: function() { $root.currentPageIndex($data) }, css: { selected: $data == $root.currentPageIndex() }\">\
                                </a>\
                            <!-- /ko -->\
                        </div>\
                    </div>\
                </div>");
