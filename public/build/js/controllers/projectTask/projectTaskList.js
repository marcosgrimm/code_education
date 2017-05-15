angular.module('app.controllers')
    .controller('ProjectTaskListController',
        ['$scope','$location','$routeParams','ProjectTask','Project',
            function($scope,$location,$routeParams,ProjectTask,Project){
        // console.log($routeParams);
                $scope.projectTask = ProjectTask.get({id:$routeParams.id,taskId:$routeParams.taskId});

                $scope.project = Project.get({id:$routeParams.id});


            }
        ]
    );