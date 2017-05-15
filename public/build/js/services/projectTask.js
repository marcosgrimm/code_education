angular.module('app.services').service('ProjectTask', ['$resource','appConfig', function($resource,appConfig){
        return $resource(appConfig.baseUrl+'/project/:id/task/:taskId',{id:'@id',taskId:'@taskId'},{
                update: {
                        method:'PUT'
                },
        });
}]);
