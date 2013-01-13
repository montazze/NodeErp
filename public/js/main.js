


$(function(){
    $("#projectDialog").hide();

    var data = [
        new projectItem("ARIWE1207", 1),
        new projectItem("ARBWE1101", 2)
    ];


    function projectItem(name, id) {
        return {
            Name: ko.observable(name),
            Id: ko.observable(id)
        };
    }


    var viewModel = function() {

        var self = this;


        // data
        self.projects = ko.observableArray([]);
        self.projectToAdd =  ko.observable("");
        self.selectedProject =  ko.observable(null);

        // behaviors
        self.addProject = function () {
            this.projects.push({ Name: this.projectToAdd() });
            this.projectToAdd("");
        },

        self.selectProject = function () {
            console.log("inside selectTag");
            viewModel.selectedProject(this);
        },

        self.loadProjects = function(){
            self.loadProjectsCallback(data)
        }

        self.loadProjectsCallback = function(data){
            $.each(data, function(i,d){
                self.projects.push(d)
            })

        }


        return{
            projects: self.projects,
            projectToAdd: self.projectToAdd,
            selectedProject: self.selectedProject,
            addProject: self.addProject,
            selectProject: self.selectProject,
            loadProjects: self.loadProjects
        }


    }();


    $(document).on("click", ".project-delete", function () {
        var itemToRemove = ko.dataFor(this);
        viewModel.projects.remove(itemToRemove);
    });

    $(document).on("click", ".project-edit", function () {

        $("#projectDialog").dialog({
            buttons: {
                Save: function () { $(this).dialog("close"); },
                Cancel: function () { $(this).dialog("close"); }
            }
        });
    });
    $(document).on("click","#lookup-click",function(){
        $("#lookupDialog").dialog({
            modal: true,
            buttons:{
                Ok: function(){
                    $("#lookupValue").val("test");
                    $("#lookupId").val("1");
                    $(this).dialog("close");
                },
                Cancel: function(){
                    $("#lookupValue").val("");
                    $("#lookupId").val("");
                    $(this).dialog("close");
                }
            }
        })


    });

    viewModel.loadProjects();
    ko.applyBindings(viewModel);




});
