angular.module('app.services').service('ProjectNote', ['$resource','appConfig', function($resource,appConfig){
        return $resource(appConfig.baseUrl+'/project/:id/note/:noteId',{id:'@id',noteId:'@noteId'},{
                update: {
                        method:'PUT'
                },
        });
}]);

angular.module('app.services').service('ProjectNotes', ['$resource','appConfig', function($resource,appConfig){
    return $resource(appConfig.baseUrl+'/project/:id/notes',{id:'@id'},{
        update: {
            method:'PUT'
        }
    });
}]);
