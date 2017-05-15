angular.module('app.controllers')
    .controller('ProjectTaskEditController',
        ['$scope','$location','$routeParams','Project','ProjectTask','appConfig',
            function($scope,$location,$routeParams,Project,ProjectTask,appConfig){

                $scope.projectTask = ProjectTask.get({id:$routeParams.id,taskId:$routeParams.taskId});

                $scope.status = appConfig.project.status;
                $scope.project = Project.get({id:$routeParams.id});
                $scope.start_date = {
                    status: {
                        opened: false
                    }
                };
                $scope.due_date = {
                    status: {
                        opened: false
                    }
                };


                $scope.openStartDate = function ($event){
                    $scope.start_date.status.opened = true;
                };

                $scope.openDueDate = function ($event){
                    $scope.due_date.status.opened = true;
                };




                $scope.save = function (){
                    if ($scope.form.$valid){
                        ProjectTask.update({id:$routeParams.id,taskId:$routeParams.taskId}, $scope.projectTask,function(){
                            $location.path('/project/'+($routeParams.id)+'/tasks');
                        });
                    }
                }

    }]);