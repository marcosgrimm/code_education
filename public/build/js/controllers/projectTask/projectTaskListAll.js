angular.module('app.controllers')
    .controller('ProjectTaskListAllController',['$scope','$routeParams','Project','ProjectTask',function($scope,$routeParams,Project,ProjectTask){

        $scope.project = Project.get({id:$routeParams.id});
        $scope.projectTasks = ProjectTask.query({id:$routeParams.id});


    }]);