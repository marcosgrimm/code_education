angular.module('app.controllers')
    .controller('ProjectTaskNewController',
        ['$scope','$location','$routeParams','ProjectTask','Project','appConfig',function($scope,$location,$routeParams,ProjectTask,Project,appConfig){

            $scope.projectTask = new ProjectTask();
            $scope.projectTask.project_id = $routeParams.id;

            $scope.project = Project.get({id:$routeParams.id});


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
                    $scope.projectTask.$save({id: $routeParams.id}).then(function(){
                        $location.path('/project/'+$routeParams.id+'/tasks');
                    });
                }
            }

    }]);