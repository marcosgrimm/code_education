angular.module('app.controllers')
    .controller('ProjectMemberRemoveController',
        ['$scope','$location','$routeParams','Project','ProjectMember',
            function($scope,$location,$routeParams,Project,ProjectMember){
                $scope.projectMember = ProjectMember.get({id:$routeParams.id,memberId:$routeParams.memberId});

                $scope.project = Project.get({id:$routeParams.id});

console.log($scope.projectMember );
                $scope.remove = function (){



                    $scope.projectMember.$delete({
                        id: $routeParams.id,
                        memberId: $routeParams.memberId
                    }).then(function () {
                        $location.path('/project/' + $routeParams.id + '/members');
                    });
                }
    }]);