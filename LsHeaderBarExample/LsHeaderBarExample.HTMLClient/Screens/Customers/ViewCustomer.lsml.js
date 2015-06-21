/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewCustomer.Details_postRender = function (element, contentItem) {
    var name = contentItem.screen.Customer.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Customer." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}

myapp.ViewCustomer.Delete_Tap_execute = function (screen) {
    ccdls.deleteEntity(screen.Customer, { displayName: "Customer" });
};
