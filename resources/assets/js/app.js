var app = angular.module('app',[
    'ngRoute','angular-oauth2','app.controllers','app.services','app.filters', 'app.directives',
    "ui.bootstrap.typeahead",'ui.bootstrap.datepicker','ui.bootstrap.tpls','ui.bootstrap.modal',
    'ngFileUpload','http-auth-interceptor',

]);

angular.module('app.controllers',['ngMessages','angular-oauth2']);
angular.module('app.filters', []);
angular.module('app.directives', []);
angular.module('app.services',['ngResource']);
app.provider('appConfig', ['$httpParamSerializerProvider', function($httpParamSerializerProvider){
    var config = {
        baseUrl: 'http://localhost:8000',
        urls: {
            projectFile:'/project/{{id}}/file/{{idFile}}'
        },
        project:{
            status:[
                {value:1,label:'Não Iniciado'},
                {value:2,label:'Iniciado'},
                {value:3,label:'Concluído'}
            ]
        },
        projectTask:{
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

    $httpProvider.interceptors.splice(0, 1);
    $httpProvider.interceptors.splice(0, 1);
    $httpProvider.interceptors.push('oauthFixInterceptor');

    $routeProvider

        .when('/login',{
            templateUrl:'build/views/login.html',
            controller:'LoginController'
        })
        .when('/logout',{
            resolve: {
                logout:['$location','OAuthToken',function($location,OAuthToken){
                    OAuthToken.removeToken();
                    $location.path('login');

                }]
            }
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

        .when('/project/:id/files',{
            templateUrl:'build/views/projectFile/listAll.html',
            controller:'ProjectFileListAllController'
        })
        .when('/project/:id/file/new',{
            templateUrl:'build/views/projectFile/new.html',
            controller:'ProjectFileNewController'
        })
        .when('/project/:id/file/:fileId/edit',{
            templateUrl:'build/views/projectFile/edit.html',
            controller:'ProjectFileEditController'
        })
        .when('/project/:id/file/:fileId/remove',{
            templateUrl:'build/views/projectFile/remove.html',
            controller:'ProjectFileRemoveController'
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
        .when('/project/:id/tasks',{
            templateUrl:'build/views/projectTask/listAll.html',
            controller:'ProjectTaskListAllController'
        })
        .when('/project/:id/task/new',{
            templateUrl:'build/views/projectTask/new.html',
            controller:'ProjectTaskNewController'
        })
        .when('/project/:id/task/:taskId',{
            templateUrl:'build/views/projectTask/list.html',
            controller:'ProjectTaskListController'
        })
        .when('/project/:id/task/:taskId/edit',{
            templateUrl:'build/views/projectTask/edit.html',
            controller:'ProjectTaskEditController'
        })
        .when('/project/:id/task/:taskId/remove',{
            templateUrl:'build/views/projectTask/remove.html',
            controller:'ProjectTaskRemoveController'
        })
        .when('/project/:id/members',{
            templateUrl:'build/views/projectMember/listAll.html',
            controller:'ProjectMemberListAllController'
        })
        .when('/project/:id/member/new',{
            templateUrl:'build/views/projectMember/new.html',
            controller:'ProjectMemberNewController'
        })
        .when('/project/:id/member/:memberId/remove',{
            templateUrl:'build/views/projectMember/remove.html',
            controller:'ProjectMemberRemoveController'
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


app.run(['$rootScope','$location', '$window','$http','$modal', 'httpBuffer', 'OAuth',
    function($rootScope, $location, $window, $http, $modal, httpBuffer, OAuth) {
    $rootScope.$on('$routeChangeStart', function (event, next,current) {
        if (next.$$route.originalPath != '/login' && OAuth.isAuthenticated() == false){
            $location.path('login');
        }
    });
    $rootScope.$on('oauth:error', function(event, data) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === data.rejection.data.error) {
            return;
        }

        // Refresh token when a `invalid_token` error occurs.
        if ('access_denied' === data.rejection.data.error) {
            httpBuffer.append(data.rejection.config,data.deferred);
            if (!$rootScope.loginModalOpened){
                var modalInstance = $modal.open({
                    templateUrl: 'build/views/templates/loginModal.html',
                    controller: 'LoginModalController'
                });
                $rootScope.loginModalOpened = true;
                return;
            }
        }

        // Redirect to `/login` with the `error_reason`.
        $location.path('login');
    });
}]);
