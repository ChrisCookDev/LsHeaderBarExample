/*!
    ChrisCookDev LightSwitch JavaScript Library v1.0.0
*/

var ccdls = (function () {
    var _ccdls = {};

    _ccdls.deleteEntity = function (entity, options) {
        /// <summary>
        /// Delete an entity
        /// </summary>
        /// <param name="entity" type="Object">the entity to be deleted</param>
        /// <param name="options" optional="true" type="PlainObject">
        /// A set of key/value pairs used to select additional configuration options. All options are optional.
        /// <br/>- String displayName: defines the description to be used to refer to this type of entity in the deletion prompt (default: "Entry")
        /// <br/>- Number navigateBackDistance: determines the number of screens to navigate back after deletion (default: 0)
        /// <br/>- Boolean remainOnScreen: when set to true, this method remains on the same screen after deletion of an entity (default: false)
        /// </param>
        options = options || {}; // Force options to be an object
        var displayName = options.displayName || "Entry";
        msls.showMessageBox("Are you sure you want to permanently delete this " + displayName.toLowerCase() + "?", {
            title: "Delete " + displayName,
            buttons: msls.MessageBoxButtons.yesNo
        }).then(function (result) {
            if (result === msls.MessageBoxResult.yes) {
                entity.deleteEntity();
                var fn = myapp.commitChanges;
                if (options.remainOnScreen || (typeof options.navigateBackDistance !== "undefined" && options.navigateBackDistance === 0)) {
                    fn = myapp.applyChanges;
                }
                return fn().then(function onComplete(result) {
                    if (options.navigateBackDistance && options.navigateBackDistance > 1) {
                        for (var i = 1; i < options.navigateBackDistance; i++) {
                            myapp.navigateBack();
                        }
                    }
                }, function onError(e) {
                    msls.showMessageBox(e.message, {
                        title: e.title
                    }).then(function () {
                        entity.details.discardChanges(); // NOTE: unlike myapp.cancelChanges, discardChanges remains on the screen (for further details see http://lightswitchhelpwebsite.com/Blog/tabid/61/EntryId/188/Deleting-Data-In-The-Visual-Studio-LightSwitch-HTML-Client.aspx)
                    });
                });
            }
        });
    };

    return _ccdls;
})();
