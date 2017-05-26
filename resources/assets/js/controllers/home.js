angular.module('app.controllers')
    .controller('HomeController',['$scope','Project',function($scope,Project){

        Project.query({
            orderBy: 'created_at',
            sortedBy: 'desc',
            limit: 8
        },function(response){
            $scope.projects = response.data;
        });



    }]);