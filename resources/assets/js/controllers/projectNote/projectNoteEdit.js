angular.module('app.controllers')
    .controller('ProjectNoteEditController',
        ['$scope','$location','$routeParams','Project','ProjectNote',
            function($scope,$location,$routeParams,Project,ProjectNote){
                $scope.projectNote = ProjectNote.get({id:$routeParams.id,noteId:$routeParams.noteId});

                $scope.project = Project.get({id:$routeParams.id});

                $scope.save = function (){
                    if ($scope.form.$valid){
                        ProjectNote.update({id:$routeParams.id,noteId:$scope.projectNote.id}, $scope.projectNote,function(){
                            $location.path('/project/'+($routeParams.id)+'/notes');
                        });
                    }
                }

    }]);