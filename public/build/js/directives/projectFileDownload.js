angular.module('app.directives')
    .directive('projectFileDownload',
        ['$timeout','appConfig','ProjectFile','$timeout',function($timeout,appConfig,ProjectFile) {
            return {
                restrict: 'E',
                templateUrl: appConfig.baseUrl+'/build/views/templates/projectFileDownload.html',
                link: function(scope,element,attr){

                    var anchor = element.children()[0];

                    scope.$on('salvar-arquivo', function(event, data) {
                        console.log(element.children());
                        $(anchor).removeClass('disabled');
                        $(anchor).text('Save File');
                        $(anchor).attr({
                            href: 'data:application-octet-stream;base64,' + data.file,
                            download: data.name
                        });
                        // console.log($(anchor));
                        $timeout(function () {
                            scope.downloadFile = function(){

                            };
                            $(anchor)[0].click();
                        });

                    });

                    //scope.emit('salvar-arquivo');
                },
                controller: ['$scope','$element','$attrs',function ($scope,$element,$attrs) {

                    $scope.downloadFile = function () {
                        // console.log(1234);
                        var anchor = $element.children()[0];
                        $(anchor).addClass('disabled');
                        $(anchor).text('Loading...');
                        ProjectFile.download({id:$attrs.projectId,idFile:$attrs.idFile},function(data){
                            $scope.$emit('salvar-arquivo', data);
                        });
                    }
                }]
            };
            // console.log($scope.projectFiles);
        }]);