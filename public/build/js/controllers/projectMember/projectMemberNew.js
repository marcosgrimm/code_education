angular.module('app.controllers')
    .controller('ProjectMemberNewController',
        ['$scope','$location','$routeParams','ProjectMember',function($scope,$location,$routeParams,ProjectMember){

            $scope.projectMember = new ProjectMember();
            $scope.projectMember.project_id = $routeParams.id;

            $scope.save = function (){
                if ($scope.form.$valid){
                    $scope.projectMember.$save({id: $routeParams.id}).then(function(){
                        $location.path('/project/'+$routeParams.id+'/members');
                    });
                }
            }

    }]);