angular.module('app.controllers')
    .controller('ProjectFileRemoveController',
        ['$scope','$location','$routeParams','Project','ProjectFile',
            function($scope,$location,$routeParams,Project,ProjectFile){

                $scope.projectFile = ProjectFile.get({
                    idFile: $routeParams.fileId,
                    id: $routeParams.id
                });
                $scope.project = Project.get({id:$routeParams.id});

                $scope.remove = function (){
                    $scope.projectFile.$delete({
                        id: $routeParams.id,
                        idFile: $routeParams.fileId
                    }, $scope.projectFile,function(){
                        $location.path('/project/'+($routeParams.id)+'/files');
                    });

                }
    }]);