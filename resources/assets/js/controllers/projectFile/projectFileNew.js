angular.module('app.controllers')
    .controller('ProjectFileNewController',
        ['$scope','$location','$routeParams','appConfig','Upload','Url',function($scope,$location,$routeParams,appConfig,Upload,Url){
            $scope.project_id = $routeParams.id;


            // console.log(Url.getUrlResource('/project/{{id}}/file/{{idFile}}'));
            // console.log(Url.getUrlFromUrlSymbol('/project/{{id}}/file/{{idFile}}',{id: 1,idFile:10}));
            // console.log(Url.getUrlFromUrlSymbol('/project/{{id}}/file/{{idFile}}',{id: '',idFile:10}));
            // console.log(Url.getUrlFromUrlSymbol('/project/{{id}}/file/{{idFile}}',{id: 1,idFile:''}));
            $scope.save = function () {
                if ($scope.form.$valid) {
                    var url = appConfig.baseUrl +
                        Url.getUrlFromUrlSymbol(appConfig.urls.projectFile, {
                            id: $routeParams.id,
                            idFile: ''
                        });
                    Upload.upload({
                        url: url,
                        fields: {
                            name: $scope.projectFile.name,
                            description: $scope.projectFile.description,
                            project_id: $routeParams.id
                        },
                        file: $scope.projectFile.file
                    }).success(function (data, status, headers, config) {
                        $location.path('/project/' + $routeParams.id + '/files');
                    });
                }
            }


    }]);