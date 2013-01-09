var grid = angular.module('grid', ['ngGrid']);

var INTEGER_REGEXP = /^\-?\d*$/;

grid.directive('validator', function () {
    return {
        require:'ngModel',
        link:function (scope, element, attrs, ctrl) {
            var validationFunction = scope.editableColumns[scope.$eval(attrs.validator)];
            var validator = (validationFunction == undefined || validationFunction == "") ? null : grid[validationFunction];
            ctrl.$parsers.unshift(function (viewValue) {
                if (validator == null || validator(viewValue, element.attr('name'))) {
                    document.getElementById(element.attr('name')).style.display = 'none';
                    return viewValue;
                } else {
                    document.getElementById(element.attr('name')).style.display = 'block';
                    return undefined;
                }
            });
        }
    }
});

grid.integer = function (value, errorHolder) {
    var toggleErrorMessageDisplay = function (valid, errorHolder) {
        if (valid) {
            document.getElementById(errorHolder).style.display = 'none';
        } else {
            document.getElementById(errorHolder).style.display = 'block';
        }
    };

    var INTEGER_REGEXP = /^\d*$/;
    var valid = INTEGER_REGEXP.test(value);

    if (errorHolder != undefined) toggleErrorMessageDisplay(valid, errorHolder)

    return valid;
};




