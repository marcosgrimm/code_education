angular.module('app.controllers')
    .controller('ProjectMemberListAllController',['$scope','$routeParams','Project','ProjectMember',function($scope,$routeParams,Project,ProjectMember){

        $scope.project = Project.get({id:$routeParams.id});
        console.log($routeParams);
        $scope.projectMembers = ProjectMember.query({id:$routeParams.id});


    }]);