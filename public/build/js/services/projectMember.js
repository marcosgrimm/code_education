angular.module('app.services').service('ProjectMember', ['$resource','appConfig', function($resource,appConfig){
        return $resource(appConfig.baseUrl+'/project/:id/member/:memberId',{id:'@id',memberId:'@memberId'},{
                update: {
                        method:'PUT'
                },
        });
}]);
