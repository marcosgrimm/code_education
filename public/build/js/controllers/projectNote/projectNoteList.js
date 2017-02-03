angular.module('app.controllers')
    .controller('ProjectNoteListController',
        ['$scope','$location','$routeParams','ProjectNote','Project',
            function($scope,$location,$routeParams,ProjectNote,Project){
                $scope.projectNote = ProjectNote.get({id:$routeParams.id,noteId:$routeParams.noteId});

                $scope.project = Project.get({id:$routeParams.id});


            }
        ]
    );