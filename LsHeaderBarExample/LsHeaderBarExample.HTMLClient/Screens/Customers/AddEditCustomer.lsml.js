/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.AddEditCustomer.Delete_Tap_canExecute = function (screen) {
    return screen.Customer.details.entityState !== msls.EntityState.added;
};
myapp.AddEditCustomer.Delete_Tap_execute = function (screen) {
    ccdls.deleteEntity(screen.Customer, { displayName: "Customer", navigateBackDistance: 2 });
};