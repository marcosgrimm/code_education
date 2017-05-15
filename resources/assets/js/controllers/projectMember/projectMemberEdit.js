angular.module('app.controllers')
    .controller('ProjectMemberEditController',
        ['$scope','$location','$routeParams','Project','ProjectMember',
            function($scope,$location,$routeParams,Project,ProjectMember){

                $scope.projectMember = ProjectMember.get({id:$routeParams.id,memberId:$routeParams.memberId});

                $scope.project = Project.get({id:$routeParams.id});

                $scope.save = function (){
                    if ($scope.form.$valid){

                        ProjectMember.update({id:$routeParams.id,memberId:$routeParams.memberId}, $scope.projectMember,function(){
                            $location.path('/project/'+($routeParams.id)+'/members');
                        });
                    }
                }

    }]);