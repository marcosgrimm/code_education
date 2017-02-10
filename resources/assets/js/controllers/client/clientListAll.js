angular.module('app.controllers')
    .controller('ClientsListControllerAll',['$scope','Client',function($scope,Client){

        $scope.clients = Client.query();


    }]);