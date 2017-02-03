angular.module('app.controllers')
    .controller('ClientsListController',['$scope','Client',function($scope,Client){
        $scope.clients = Client.query();


    }]);