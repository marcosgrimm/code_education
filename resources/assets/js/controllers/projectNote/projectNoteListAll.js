angular.module('app.controllers')
    .controller('ProjectNoteListAllController',['$scope','$routeParams','Project','ProjectNotes',function($scope,$routeParams,Project,ProjectNotes){
        $scope.project = Project.get({id:$routeParams.id});

        $scope.projectNotes = ProjectNotes.query({id:$routeParams.id});


    }]);