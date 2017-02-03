angular.module('app.controllers')
    .controller('ClientListController',
        ['$scope','$location','$routeParams','Client',
            function($scope,$location,$routeParams,Client){
                $scope.client = Client.get({id:$routeParams.id});
            }
        ]
    );