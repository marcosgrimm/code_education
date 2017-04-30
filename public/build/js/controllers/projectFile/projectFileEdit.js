angular.module('app.controllers')
    .controller('ProjectFileEditController',
        ['$scope','$location','$routeParams','Project','ProjectFile',
            function($scope,$location,$routeParams,Project,ProjectFile){

                $scope.projectFile = ProjectFile.get({
                    idFile: $routeParams.fileId,
                    id: $routeParams.id
                });
                // console.log(ProjectFile,Project);
                $scope.project = Project.get({id:$routeParams.id});

                $scope.save = function (){
                    if ($scope.form.$valid){

                        ProjectFile.update({id:$routeParams.id,idFile:$routeParams.fileId}, $scope.projectFile,function(){
                            $location.path('/project/'+($routeParams.id)+'/files');
                        });
                    }
                }

    }]);