angular.module('app.controllers')
    .controller('ProjectListAllController',['$scope','Project',function($scope,Project){


        $scope.projects = Project.query();

    }]);