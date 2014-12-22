var myApp = angular.module("myApp", []);
myApp.controller("MyController", ["$scope", function($scope) {
  $scope.x1 = [0, 0, 0, 0, 0];
  $scope.x2 = [0, 0, 0, 0];
}]);
