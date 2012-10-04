/// <reference path="knockout-1.3.0beta.debug.js" />
/// <reference path="jquery-ui-1.8.16.js" />
/// <reference path="jquery-1.6.4.js" />
/// <reference path="ajax-util.js" />
/// <reference path="ko-protected-observable.js" />

$(function () {
    $("#tagDialog").hide();

    $.getJSON("/tags", function (data) {
        var viewModel = {
            // data
            tags: ko.observableArray(ko.toProtectedObservableItemArray(data)),
            tagToAdd: ko.observable(""),
            selectedTag: ko.observable(new ko.protectedObservableItem(data[0])),

            // behaviors
            addTag: function () {
                var newTag = { Name: this.tagToAdd() };
                this.tagToAdd("");

                ajaxAdd("/tags", ko.toJSON(newTag), function (data) {
                    viewModel.tags.push(new ko.protectedObservableItem(data));
                });
            },

            selectTag: function () {
                viewModel.selectedTag(this);
            },

            // Data (Drills)
            currentTagDrills: ko.observableArray([]),
            drillToAdd: ko.observable(""),
            useDrillEditTemplate: ko.observable(null),
            hoverDrill: ko.observable(),
            clickedDrill: ko.observable(null),

            // Behaviors (Drills)
            editDrill: function () {
                viewModel.useDrillEditTemplate(true);
            },

            tagNameFor: function (id) {
                var tagItem = ko.utils.arrayFirst(viewModel.tags(), function (item) {
                    return item.Id() === parseInt(id);
                });
                return tagItem.Name;
            },

            saveDrill: function () {
                viewModel.selectedDrill().commit();
                var drill = viewModel.selectedDrill();
                viewModel.useDrillEditTemplate(null);
                ajaxUpdate("/drills/" + drill.Id(), ko.toJSON(drill));
            },

            cancelDrillEdit: function () {
                viewModel.useDrillEditTemplate(null);
            },

            addDrill: function () {
                var newDrill = { Name: this.drillToAdd(), TagId: this.selectedTag().Id };
                this.drillToAdd("");

                ajaxAdd("/drills", ko.toJSON(newDrill), function (data) {
                    viewModel.currentTagDrills.push(new ko.protectedObservableItem(data));
                });
            },

            drillMouseOver: function () {
                viewModel.hoverDrill(this);
            },

            drillMouseOut: function () {
                viewModel.hoverDrill(null);
            },

            drillClick: function () {
                viewModel.clickedDrill(this);
            },

            isClicked: function () {
                return this === viewModel.clickedDrill();
            }
        }; // end viewModel

        $(".tag-delete").live("click", function () {
            var itemToRemove = ko.dataFor(this);
            viewModel.tags.remove(itemToRemove);
            ajaxDelete("/tags/" + itemToRemove.Id());
        });

        $(".tag-edit").live("click", function () {
            viewModel.selectedTag(ko.dataFor(this));
            $("#tagDialog").dialog({
                buttons: {
                    Save: function () {
                        $(this).dialog("close");
                        viewModel.selectedTag().Name.commit();
                        ajaxUpdate("/tags/" + viewModel.selectedTag().Id(), ko.toJSON(viewModel.selectedTag()));
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

        $(".drill-delete").live("click", function () {
            var itemToRemove = ko.dataFor(this);
            viewModel.currentTagDrills.remove(itemToRemove);
            ajaxDelete("/drills/" + itemToRemove.Id());
            viewModel.clickedDrill(null);
            viewModel.hoverDrill(null);
        });

        viewModel.selectedDrill = ko.dependentObservable(function () {
            var hoverDrill = this.hoverDrill();
            var clickedDrill = this.clickedDrill();
            return hoverDrill ? hoverDrill : (clickedDrill ? clickedDrill : this.currentTagDrills()[0]);
        }, viewModel);

        ko.dependentObservable(function () {
            $.getJSON("/drills?tagId=" + this.selectedTag().Id(), function (data) {
                viewModel.currentTagDrills(ko.toProtectedObservableItemArray(data));
            });
        }, viewModel);

        ko.applyBindings(viewModel);
    });
});

/// <reference path="knockout-1.3.0beta.debug.js" />
/// <reference path="jquery-ui-1.8.16.js" />
/// <reference path="jquery-1.7.1.js" />
/// <reference path="ajax-util.js" />
/// <reference path="ko-protected-observable.js" />

$(function () {
    $("#tagDialog").hide();

    //    var data = [
    //        { Id: 1, Name: "Ball Handling" },
    //        { Id: 2, Name: "Passing" },
    //        { Id: 3, Name: "Shooting" },
    //        { Id: 4, Name: "Rebounding" },
    //        { Id: 5, Name: "Transition" },
    //        { Id: 6, Name: "Defense" },
    //        { Id: 7, Name: "Team Offense" },
    //        { Id: 8, Name: "Team Defense" }
    //    ];

    var data = [
        new tagItem("Ball Handling", 1),
        new tagItem("Passing", 2),
        new tagItem("Shooting", 3),
        new tagItem("Rebounding", 4),
        new tagItem("Transition", 5),
        new tagItem("Defense", 6),
        new tagItem("Team Offense", 7),
        new tagItem("Team Defense", 8)
    ];

    function tagItem(name, id) {
        return {
            Name: ko.observable(name),
            Id: ko.observable(id)
        };
    }

    var viewModel = {
        // data
        tags: ko.observableArray(data),
        tagToAdd: ko.observable(""),
        selectedTag: ko.observable(null),


        // behaviors
        addTag: function () {
            this.tags.push({ Name: this.tagToAdd() });
            this.tagToAdd("");
        },

        selectTag: function () {
            console.log("inside selectTag");
            viewModel.selectedTag(this);
        }
    };





    $(document).on("click", ".tag-delete", function () {
        var itemToRemove = ko.dataFor(this);
        viewModel.tags.remove(itemToRemove);
    });

    $(document).on("click", ".tag-edit", function () {
        $("#tagDialog").dialog({
            buttons: {
                Save: function () { $(this).dialog("close"); },
                Cancel: function () { $(this).dialog("close"); }
            }
        });
    });

    ko.applyBindings(viewModel);

});
function WebmailViewModel() {
    // Data
    var self = this;

        $.each(data, function(index, element) {
                    $('body').append($('<div>', {
                        text: element.name
                    }));
                });


        alert('test');


    } );
};

<tbody data-bind="foreach: books">

    <tr>

        <td data-bind="text: title">

            This will be the title

        </td>

        <td data-bind="text: author">

            This will be the author

        </td>

    </tr>

</tbody>

$(function () {
    var photoPath = "/images/";

    infuser.defaults.templateSuffix = ".tmpl.html";
    infuser.defaults.templateUrl = "/templates";

    // Could create a utility function to do this
    my.objectInArray = function (searchFor, property) {
        var retVal = false;
        $.each(this, function (index, item) {
            if (item.hasOwnProperty(property)) {
                if (item[property]() === searchFor) {
                    retVal = item[property];
                    return retVal;
                }
            }
        });
        return retVal;
    };
    Array.prototype.objectInArray = my.objectInArray;

    // function helper
    my.formatCurrency = function (value) {
        return "$" + value.toFixed(2);
    };

    // for creating (guitar) Model Models :)
    my.Model = function () {
        this.id = ko.observable();
        this.brand = ko.observable();
        this.name = ko.observable();
    };

    my.Category = function () {
        this.id = ko.observable();
        this.name = ko.observable();
    };

    // for creating Product Models
    my.Product = function (selectedItem) {
        var self = this;
        self.id = ko.observable();
        self.salePrice = ko.observable();
        self.photo = ko.observable();
        self.model = ko.observable();
        self.category = ko.observable();
        self.description = ko.observable();
        self.rating = ko.observable();
        self.isSelected = ko.computed(function () {
            return selectedItem() === self;
        });
        self.isGuitar = ko.computed(function () {
            return this.category() ? this.category().id() === 1 : false;
        }, self),
        self.shortDesc = ko.computed(function () {
            return this.model() ? this.model().brand() + " " + this.model().name() : "";
        }, self),
        self.photoUrl = ko.computed(function () {
            return photoPath + this.photo();
        }, self),
        self.rating.subscribe(function () {
            this.stateHasChanged(true);
        }, self),
        self.stateHasChanged = ko.observable(false);
    };

    my.CartItem = function () {
        var self = this;
        self.product = ko.observable();
        self.quantity = ko.observable();
        self.extPrice = ko.computed(function () {
            return this.product() ? this.product().salePrice() * this.quantity() : 0;
        }, self);
    };

    my.DialogOptions = function () {
        var self = this;
        self.open = ko.observable(false);
        self.title = ko.observable();
        self.text = ko.observable();
        self.accept = function () { self.open(false); };
        self.cancel = function () { self.open(false); };
    };

    // The ViewModel
    my.vm = function () {
        var metadata = {
            pageTitle: "Knockout: Loading and Saving",
            personal: {
                link: "http://twitter.com/john_papa",
                text: "@john_papa"
            },
            topics: [
                { desc: "ajax" },
                { desc: "jQuery UI dialog" },
                { desc: "external templates" },
                { desc: "containerless templates" },
                { desc: "item selection, within an observable array" },
                { desc: "foreach" },
                { desc: "custom binding handler: jqDialog"}]
        },
            dialogOptions = new my.DialogOptions(),
            defaultAnimationSpeed = 500,
            products = ko.observableArray([]),
            selectedProduct = ko.observable(),
            sortFunction = function (a, b) {
                return a.shortDesc().toLowerCase() > b.shortDesc().toLowerCase() ? 1 : -1;
            },
            selectProduct = function (p) {
                selectedProduct(p);
            },
            hideItem = function (elem) {
                if (elem.nodeType === 1) {
                    var effect = function () {
                        return $(elem).fadeOut(defaultAnimationSpeed);
                    };
                    effect();
                }
            },
            showItem = function (elem) {
                if (elem.nodeType === 1) {
                    var effect = function () {
                        return $(elem).hide().fadeIn(defaultAnimationSpeed);
                    };
                    effect();
                }
            },
            shoppingCart = ko.observableArray([]),
            addToCart = function (product) {
                if (!shoppingCart().objectInArray(product, "product")) {
                    var cartItem = new my.CartItem()
                                                .product(product)
                                                .quantity(1);
                    shoppingCart.push(cartItem);
                    products.remove(product);
                }
            },
            removeFromCart = function (cartItem) {
                if (shoppingCart().indexOf(cartItem) > -1) {
                    products.push(cartItem.product());
                    shoppingCart.remove(cartItem);
                }
            },
            grandTotal = ko.computed(function () {
                var total = 0;
                $.each(shoppingCart(), function () {
                    total += this.extPrice();
                });
                return total;
            }),
            loadProductsCallback = function (json) {
                $.each(json, function (i, p) {
                    //$.each(my.sampleData.data.Products, function (i, p) {
                    products.push(new my.Product(selectedProduct)
                            .id(p.Id)
                            .salePrice(p.SalePrice)
                            .photo(p.Photo)
                            .category(new my.Category()
                            .id(p.Category.Id)
                            .name(p.Category.Name)
                                )
                            .model(new my.Model()
                            .id(p.Model.Id)
                            .name(p.Model.Name)
                            .brand(p.Model.Brand)
                                )
                            .description(p.Description)
                            .rating(p.Rating)
                            .stateHasChanged(false)
                    );
                });
                products.sort(sortFunction);
            },
            loadProducts = function () {
                my.shoppingDataService.getSaleItems(my.vm.loadProductsCallback);
            },
            placeOrderCallback = function (json) {
                dialogOptions.title("Place Order").text(json.message).open(true);
            },
            placeOrder = function () {
                my.shoppingDataService.placeOrder(shoppingCart, my.vm.placeOrderCallback);
            };
        return {
            metadata: metadata,
            dialogOptions: dialogOptions,
            selectedProduct: selectedProduct,
            selectProduct: selectProduct,
            products: products,
            loadProductsCallback: loadProductsCallback,
            loadProducts: loadProducts,
            placeOrderCallback: placeOrderCallback,
            placeOrder: placeOrder,
            hideItem: hideItem,
            showItem: showItem,
            shoppingCart: shoppingCart,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            grandTotal: grandTotal
        };
    } ();


    my.vm.loadProducts();
    ko.applyBindings(my.vm);
});

ko.applyBindings({
        people: [
            { firstName: 'Bert', lastName: 'Bertington' },
            { firstName: 'Charles', lastName: 'Charlesforth' },
            { firstName: 'Denise', lastName: 'Dentiste' }
        ]
    });
ko.applyBindings(viewModel);
loadProducts = function () {
    my.shoppingDataService.getSaleItems(my.vm.loadProductsCallback);
},

//                         ajaxservice.js
(function (my) {
    "use strict";
    my.shoppingDataService = {
        getSaleItems : function (callback) {
            //my.ajaxService.ajaxGetJsonp("GetSaleItems", null, callback);
            my.ajaxService.ajaxGetJson("GetSaleItems", null, callback);
        },

        placeOrder: function (shoppingCart, callback) {
            //my.ajaxService.ajaxPostJsonp("PlaceOrder", shoppingCart, callback);
            my.ajaxService.ajaxPostJson("PlaceOrder", shoppingCart, callback);
        }
    };
}(my));


// John Papa http://johnpapa.net
// Depends on scripts:
//                         jQuery
(function (my) {
    "use strict";
    //TODO:  put your hosting server here
    var serviceBase = 'http://localhost:50718/Product/',
        getSvcUrl = function (method) { return serviceBase + method; };

    my.ajaxService = (function () {
        var ajaxGetJson = function (method, jsonIn, callback) {
            $.ajax({
                url: getSvcUrl(method),
                type: "GET",
                data: ko.toJSON(jsonIn),
                dataType: "json",
                contentType: "application/json",
                success: function (json) {
                    callback(json);
                }
            });
        },
            ajaxPostJson = function (method, jsonIn, callback) {
                $.ajax({
                    url: getSvcUrl(method),
                    type: "POST",
                    data: ko.toJSON(jsonIn),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (json) {
                        callback(json);
                    }
                });
            };
        return {
            ajaxGetJson: ajaxGetJson,
            ajaxPostJson: ajaxPostJson
        };
    })();
} (my));