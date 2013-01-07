function bodyController($scope) {
    $scope.myData = [{name: "Moroni", age: 50,address:"sh"},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34},
        {name: "Nephi1", age: 29},
        {name: "Enos2", age: 34},
        {name: "Nephi1sdsdsdsdsds sdsdsdsdsdsds sdsdsds", age: 29},
        {name: "Enos1", age: 34}
    ];
    $scope.gridOptions = { data : 'myData',
        columnDefs: [{ field: 'name', displayName: 'Full Name', width: 200 },
            { field: 'age', displayName: 'Age', width: 200 ,cellTemplate: editCell('row.entity.age')}
        ]};

    function editCell(model){
        var divElement = '<div ng-click="editable = true" ng-hide="editable">{{'+model+'}}</div>' +
            '<div><input ng-show="editable" ng-model="'+model+'"/>'+
            '<button ng-click="editable=false" ng-show="editable">edit</button></div>';

        return divElement;

    } ;


}