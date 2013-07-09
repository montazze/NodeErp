/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 15/05/13
 * Time: 16:12
 */

function jgrid(name) {

    this.name = name;


    this.column = function(){
        this.row = '';
        this.headerText = '';
        this.hidden = 0;
    }


    this.addColumn = function(column){
              this.columns.push(column)
            }


    this.viewModel  = function(configuration){
       this.data = configuration.data;
       this.columns = [];
       this.tableHeaderText = configuration.tableHeaderText;
       this.tableSearchText = configuration.tableSearchText;
       this.tableSearchPlaceholderText = configuration.tableSearchPlaceholderText;
       this.pageSize = configuration.pageSize;
    }

};
jgrid.prototype.load = function(){

    var selectAllColumnHeaderTemplate = "<th width='20px' id='selectAll'><input type='checkbox' style='margin-left: -10px;' /></th>";
    var columnHeaderTemplate = "<th class='ui-state-default'  style='width: 19px; padding-left: 0px;'></th>";

    var selectAllColumnTemplate = "<td><input type=\"checkbox\"/></td>";
    var editColumnTemplate = "<td><a class='gridEdit'  href='#' data-bind='event: {mouseover: showDetails}'  ><img src='images/pencil.png'></a></td>";

    var header = '';
    var tables = '';

    for(var h in this.columns){

        var col = this.columns[h];

        var visibility = 'table-cell';

        if(col.hidden  === 1){
            visibility = 'none';
        }

        if(col.row === 'selection'){
            header += selectAllColumnHeaderTemplate;
            tables += selectAllColumnTemplate;
        }
        else if(col.row === 'edit'){
            header += columnHeaderTemplate;
            tables += editColumnTemplate;
        }
        else{
            header +=  "<th class='ui-state-default' id='"+ col.row +"' style=display:" + visibility + " >" + col.headerText + "</th>";
            tables +=  "<td data-bind='text: " + col.row +"' id='"+ col.row +"'  style=display:" + visibility + " ></td>";
        }
    }

    var mainTemplate =
        "<div class='widgetPanel'>" +
                    "<div class='widgetHead'>" +
                        "<div class='widgetHeadText'>" +
                            "<h5>"+ this.tableHeaderText +"</h5>" +
                        "</div>" +
                        "<div class='widgetHeadActions'><a class='gridAddNew' href='#'><img src='images/plus.png'></a> <a class='gridDelete' href='#'><img src='images/cross.png'></a>" +
                        "</div>" +
                        "<div class='widgetContent'>" +
                            "<div>" +
                                "<div class='jgridFilter'>" +
                                    "<label text='"+ this.tableSearchText + "' > </label>" +
                                    "<input type='text' placeholder='"+ this.tableSearchPlaceholderText+ "' >" +
                                    "<div class='srch'></div>" +
                                "</div>" +
                                "<table class='jgridTable' cellspacing='0'>" +
                                    "<thead>" +
                                        "<tr>" +
                                            header +
                                        "</tr>" +
                                    "</thead>" +
                                    "<tbody data-bind='foreach: index.data'>" +
                                        "<tr>" +
                                           tables +
                                        "</tr>" +
                                    "</tbody>" +
                                "</table>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
                "<div class='widgetFooter'>" +
                    "<div class='jgridToolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix'>" +
                        "<div class='jgridPageLinks'>" +
                            "<span>Page:</span>" +
                                   "<a href='#'>" +
                                   "</a>" +
                        "</div>" +
                    "</div>" +
                "</div>"



    $('[name=' + this.name  + ']').append(mainTemplate);




    $(document).on("click",".gridEdit",function(s,r){
              var urlId = '/contact/5037df386cdc1e5c02000005/edit'

              $("#contentArea").load(urlId);
              $("#editDialog").dialog({
                  modal: true,
                  height: 350,
                  width: 400

              });
          });
       $(document).on("click",".gridAddNew",function(){
           $("#contentArea").load('/contact/new');
           $("#editDialog").dialog({
               modal: true,
               height: 350,
               width: 400

           });

       });

}
