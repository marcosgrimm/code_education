angular.module('app.controllers')
    .controller('ProjectMemberListController',
        ['$scope','$location','$routeParams','ProjectMember','Project',
            function($scope,$location,$routeParams,ProjectMember,Project){
                $scope.projectMember = ProjectMember.get({id:$routeParams.id,memberId:$routeParams.memberId});

                $scope.project = Project.get({id:$routeParams.id});


            }
        ]
    );