angular.module('app.controllers')
    .controller('ProjectTaskRemoveController',
        ['$scope','$location','$routeParams','Project','ProjectTask',
            function($scope,$location,$routeParams,Project,ProjectTask){
                $scope.projectTask = ProjectTask.get({id:$routeParams.id,taskId:$routeParams.taskId});

                $scope.project = Project.get({id:$routeParams.id});

                $scope.remove = function (){
                    $scope.projectTask.$delete({
                        id: $routeParams.id,
                        taskId: $routeParams.taskId
                    }).then(function () {
                        $location.path('/project/' + $routeParams.id + '/tasks');
                    });
                }
    }]);