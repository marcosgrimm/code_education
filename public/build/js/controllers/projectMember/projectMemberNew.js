angular.module('app.controllers')
    .controller('ProjectMemberNewController',
        ['$scope','$location','$routeParams','ProjectMember','Project','User',
            function($scope,$location,$routeParams,ProjectMember,Project,User){

            $scope.projectMember = new ProjectMember();
            $scope.projectMember.project_id = $routeParams.id;

            $scope.project = Project.get({id:$routeParams.id});

            $scope.getProjectMembers = function(name){
                return User.query({
                    search:name,
                    searchFields:'name:like'
                }).$promise;

            }
            $scope.formatProjectMemberName = function (model){
                if (model){
                    return model.name;
                }
                return '';
            }
            $scope.selectProjectMember = function(item){
                $scope.projectMember.member_id = item.id;
            }


            $scope.save = function (){
                if ($scope.form.$valid){
                    $scope.projectMember.$save({id: $routeParams.id}).then(function(){
                        $location.path('/project/'+$routeParams.id+'/members');
                    });
                }
            }

    }]);