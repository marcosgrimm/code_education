angular.module('app.controllers')
    .controller('ProjectDashboardController',
        ['$scope','$location','$routeParams','Project',

            function($scope,$location,$routeParams,Project) {

                Project.query({
                    orderBy: 'created_at',
                    sortedBy: 'desc',
                    limit: 8
                },function(response){
                    $scope.projects = response.data;
                });

                $scope.pickProject = function (project){
                    $scope.projectPicked = project;
                }
            }


    ]);