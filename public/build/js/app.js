var app = angular.module('app',[
    'ngRoute','angular-oauth2','app.controllers','app.services','app.filters',
    "ui.bootstrap.typeahead",'ui.bootstrap.datepicker','ui.bootstrap.tpls'

]);

angular.module('app.controllers',['ngMessages','angular-oauth2']);
angular.module('app.filters', []);
angular.module('app.services',['ngResource']);
app.provider('appConfig', ['$httpParamSerializerProvider', function($httpParamSerializerProvider){
    var config = {
        baseUrl: 'http://localhost:8000',
        project:{
            status:[
                {value:1,label:'Não Iniciado'},
                {value:2,label:'Iniciado'},
                {value:3,label:'Concluído'}
            ]
        },
        utils:{
            transformResponse: function (data, headers) {
                var headersGetter = headers();
                if (headersGetter['content-type'] == 'application/json' ||
                    headersGetter['content-type'] == 'text/json') {
                    var dataJson = JSON.parse(data);
                    if (dataJson.hasOwnProperty('data') && Object.keys(dataJson).length == 1) {
                        dataJson = dataJson.data;
                    }
                    return dataJson;
                }
                return data;
            },
            transformRequest: function(data){

                if (angular.isObject(data)){
                   return $httpParamSerializerProvider.$get()(data);
                }
                return data;

            }
            
        }
    }

    return {
        config : config,
        $get : function(){
            return config;
        }
    }
}]);

app.config(['$routeProvider', '$httpProvider','OAuthProvider','OAuthTokenProvider','appConfigProvider',
    function($routeProvider,$httpProvider,OAuthProvider,OAuthTokenProvider,appConfigProvider){
    //console.log(data);
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type']  = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = appConfigProvider.config.utils.transformRequest;
    $httpProvider.defaults.transformResponse = appConfigProvider.config.utils.transformResponse;
    $routeProvider
        .when('/login',{
            templateUrl:'build/views/login.html',
            controller:'LoginController'
        })
        .when('/home',{
            templateUrl:'build/views/home.html',
            controller:'HomeController'
        })
        .when('/clients',{
            templateUrl:'build/views/client/listAll.html',
            controller:'ClientsListControllerAll'
        })
        .when('/client/new',{
            templateUrl:'build/views/client/new.html',
            controller:'ClientNewController'
        })
        .when('/client/:id',{
            templateUrl:'build/views/client/list.html',
            controller:'ClientListController'
        })
        .when('/client/:id/edit',{
            templateUrl:'build/views/client/edit.html',
            controller:'ClientEditController'
        })
        .when('/client/:id/remove',{
            templateUrl:'build/views/client/remove.html',
            controller:'ClientRemoveController'
        })
        .when('/project/:id/notes',{
            templateUrl:'build/views/projectNote/listAll.html',
            controller:'ProjectNoteListAllController'
        })
        .when('/project/:id/note/new',{
            templateUrl:'build/views/projectNote/new.html',
            controller:'ProjectNoteNewController'
        })
        .when('/project/:id/note/:noteId',{
            templateUrl:'build/views/projectNote/list.html',
            controller:'ProjectNoteListController'
        })
        .when('/project/:id/note/:noteId/edit',{
            templateUrl:'build/views/projectNote/edit.html',
            controller:'ProjectNoteEditController'
        })
        .when('/project/:id/note/:noteId/remove',{
            templateUrl:'build/views/projectNote/remove.html',
            controller:'ProjectNoteRemoveController'
        })
        .when('/projects',{
            templateUrl:'build/views/project/listAll.html',
            controller:'ProjectListAllController'
        })
        .when('/project/new',{
            templateUrl:'build/views/project/new.html',
            controller:'ProjectNewController'
        })
        .when('/project/:id',{
            templateUrl:'build/views/project/list.html',
            controller:'ProjectListController'
        })
        .when('/project/:id/edit',{
            templateUrl:'build/views/project/edit.html',
            controller:'ProjectEditController'
        })
        .when('/project/:id/remove',{
            templateUrl:'build/views/project/remove.html',
            controller:'ProjectRemoveController'
        });
        OAuthProvider.configure({
            baseUrl: appConfigProvider.config.baseUrl,
            clientId: 'appid1',
            clientSecret: 'secret', // optional
            grantPath:'oauth/access_token',

        });

        OAuthTokenProvider.configure({
           name: 'token',
            options:{
                secure:false
            }
        });
}]);


app.run(['$rootScope', '$window', 'OAuth', function($rootScope, $window, OAuth) {
    $rootScope.$on('oauth:error', function(event, rejection) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === rejection.data.error) {
            return;
        }

        // Refresh token when a `invalid_token` error occurs.
        if ('invalid_token' === rejection.data.error) {
            return OAuth.getRefreshToken();
        }

        // Redirect to `/login` with the `error_reason`.
        return $window.location.href = '/login?error_reason=' + rejection.data.error;
    });
}]);
