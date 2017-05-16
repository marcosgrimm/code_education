angular.module('app.controllers')
    .controller('ProjectMemberListAllController',['$scope','$routeParams','Project','ProjectMember','User',function($scope,$routeParams,Project,ProjectMember,User){

        $scope.project = Project.get({id:$routeParams.id});
        $scope.projectMembers = ProjectMember.query({id:$routeParams.id});

    }]);