angular.module('app.controllers')
    .controller('ProjectNoteRemoveController',
        ['$scope','$location','$routeParams','Project','ProjectNote',
            function($scope,$location,$routeParams,Project,ProjectNote){
                $scope.projectNote = ProjectNote.get({id:$routeParams.id,noteId:$routeParams.noteId});

                $scope.project = Project.get({id:$routeParams.id});

                $scope.remove = function (){



                    $scope.projectNote.$delete({
                        id: $routeParams.id,
                        noteId: $routeParams.noteId
                    }).then(function () {
                        $location.path('/project/' + $routeParams.id + '/notes');
                    });
                }
    }]);