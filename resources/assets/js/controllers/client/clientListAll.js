angular.module('app.controllers')
    .controller('ClientsListControllerAll',['$scope','Client',function($scope,Client){

        Client.query({},function (response) {
            $scope.clients = response.data;
        });

    }]);