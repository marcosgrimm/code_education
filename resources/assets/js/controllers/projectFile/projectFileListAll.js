angular.module('app.controllers')
    .controller('ProjectFileListAllController',
        ['$scope','$routeParams','Project','ProjectFile',function($scope,$routeParams,Project,ProjectFile) {

        $scope.project = Project.get({id:$routeParams.id});
        // console.log(1234);
        $scope.projectFiles = ProjectFile.query({id:$routeParams.id});
        // console.log($scope.projectFiles);
    }]);