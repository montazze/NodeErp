/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 16/10/12
 * Time: 22:56
 */

(function () {
    // Private function
    function getColumnsForScaffolding(data) {
        if ((typeof data.length !== 'number') || data.length === 0) {
            return [];
        }
        var columns = [];
        for (var propertyName in data[0]) {
            columns.push({ headerText: propertyName, rowText: propertyName, hidden: propertyName });
        }
        return columns;
    }

    ko.jgrid = {
        // Defines a view model class you can use to populate a grid
        viewModel: function (configuration) {
            this.data = configuration.data;
            this.currentPageIndex = ko.observable(0);
            this.pageSize = configuration.pageSize || 5;
            this.tableHeaderText = configuration.tableHeaderText;
            this.tableSearchText = configuration.tableSearchText;
            this.tableSearchPlaceholderText = configuration.tableSearchPlaceholderText;

            // If you don't specify columns configuration, we'll use scaffolding
            this.columns = configuration.columns || getColumnsForScaffolding(ko.utils.unwrapObservable(this.data));

            this.itemsOnCurrentPage = ko.computed(function () {
                var startIndex = this.pageSize * this.currentPageIndex();
                return this.data.slice(startIndex, startIndex + this.pageSize);
            }, this);

            this.maxPageIndex = ko.computed(function () {
                return Math.ceil(ko.utils.unwrapObservable(this.data).length / this.pageSize) - 1;
            }, this);
        }
    };

    // Templates used to render the grid
    var templateEngine = new ko.nativeTemplateEngine();

    templateEngine.addTemplate = function(templateName, templateMarkup) {
        document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
    };

    templateEngine.addTemplate("ko_jgrid_grid",);

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

    // The "jgrid" binding
    ko.bindingHandlers.jgrid = {
        init: function() {
            return { 'controlsDescendantBindings': true };
        },
        // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
        update: function (element, viewModelAccessor, allBindingsAccessor) {
            var viewModel = viewModelAccessor(), allBindings = allBindingsAccessor();

            // Empty the element
            while(element.firstChild)
                ko.removeNode(element.firstChild);

            // Allow the default templates to be overridden
            var gridTemplateName      = allBindings.jgridTemplate || "ko_jgrid_grid",
                pageLinksTemplateName = allBindings.jgridPagerTemplate || "ko_jgrid_pageLinks";




            GetGridTemplate();


            // Render the main grid
            var gridContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(gridTemplateName, viewModel, { templateEngine: templateEngine }, gridContainer, "replaceNode");

            // Render the page links
            var pageLinksContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(pageLinksTemplateName, viewModel, { templateEngine: templateEngine }, pageLinksContainer, "replaceNode");
        }
    };

    ko.bindingHandlers.jgridheader = {
      init: function() {
          return { 'controlsDescendantBindings': true };
      },

       update: function (element, viewModelAccessor, allBindingsAccessor) {
                 var viewModel = viewModelAccessor(), allBindings = allBindingsAccessor();



       }
    };


    function GetGridTemplate(){

        var gridString =
         "<div class='widgetPanel'>" +
            "<div class='widgetHead'>" +
                "<div class='widgetHeadText'>" +
                    "<h5 data-bind='text: tableHeaderText'></h5>" +
                "</div>" +
                "<div class='widgetHeadActions'><a class='gridAddNew' href='#'><img src='images/plus.png'></a> <a class='gridEdit' href='#'><img src='images/pencil.png'></a> <a class='gridDelete' href='#'><img src='images/cross.png'></a>" +
                "</div>" +
                "<div class='widgetContent'>" +
                    "<div>" +
                        "<div class='jgridFilter'>" +
                            "<label data-bind='text: tableSearchText'></label>" +
                            "<input type='text' data-bind='attr: {placeholder: tableSearchPlaceholderText}' >" +
                            "<div class='srch'></div>" +
                        "</div>" +
                        "<table class='jgridTable' cellspacing='0'>" +
                            "<thead>" +
                                "<tr data-bind='foreach: columns'>" +
                                "</tr>" +
                            "</thead>" +
                        "</table>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>";

    }

    function getHeaderText(headerText){
        var headerString = "";
        if(headerText == "selection"){
            headerString = "<th width='20px' id='selectAll'><input type='checkbox' style='margin-left: -10px;' /></th>";
        }

        return headerString;
    }



})();