angular.module('app.controllers')
    .controller('ProjectNoteListAllController',['$scope','$routeParams','Project','ProjectNote',function($scope,$routeParams,Project,ProjectNote){

        $scope.project = Project.get({id:$routeParams.id});
        console.log($routeParams);
        $scope.projectNotes = ProjectNote.query({id:$routeParams.id});


    }]);