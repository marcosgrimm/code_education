angular.module('app.controllers')
    .controller('ProjectEditController',
        ['$scope','$location','$routeParams','Project','Client',
            function($scope,$location,$routeParams,Project,Client){
                $scope.project = Project.get({id:$routeParams.id});

                $scope.clients = Client.query();
               // console.log($scope.project);
                $scope.save = function (){
                    if ($scope.form.$valid){
                        Project.update({id:$routeParams.id}, $scope.project,function(){
                            $location.path('/projects');
                        });
                    }
                }

    }]);