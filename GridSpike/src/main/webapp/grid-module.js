var grid = angular.module('grid',['ngGrid']) ;

var INTEGER_REGEXP = /^\-?\d*$/;

grid.directive('integer',function() {
    return {
        require:'ngModel',
        link:function(scope,element,attrs,ctrl){
            ctrl.$parsers.unshift(function (viewValue) {
                if (INTEGER_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('integer', true);
                    document.getElementById(element.attr('name')).style.display = 'none';
                     return viewValue;
                } else {
                    ctrl.$setValidity('integer', false);
                    document.getElementById(element.attr('name')).style.display = 'block';
                    return undefined;
                }
            });
        }
    }
});

