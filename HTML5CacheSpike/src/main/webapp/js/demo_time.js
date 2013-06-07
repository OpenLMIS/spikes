function MyController ($scope, $http) {
  $scope.myVariable = "hahaha";
  $http.get('/page4.html', {cache: true}).success(function(data) {
    console.log(data);
  }).error(function() {

      })

}