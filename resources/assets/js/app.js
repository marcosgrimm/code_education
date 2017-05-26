var app = angular.module('app',[
    'ngRoute','angular-oauth2','app.controllers','app.services','app.filters', 'app.directives',
    "ui.bootstrap.typeahead",'ui.bootstrap.datepicker','ui.bootstrap.tpls','ui.bootstrap.modal',
    'ngFileUpload','http-auth-interceptor','angularUtils.directives.dirPagination',
    'ui.bootstrap.dropdown','ui.bootstrap.tabs'

]);

angular.module('app.controllers',['ngMessages','angular-oauth2']);
angular.module('app.filters', []);
angular.module('app.directives', []);
angular.module('app.services',['ngResource']);
app.provider('appConfig', ['$httpParamSerializerProvider', function($httpParamSerializerProvider){
    var config = {
        appName: 'ProjectManager', // Project Manager
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
                    console.log(dataJson);
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
    function($routeProvider,   $httpProvider,OAuthProvider,OAuthTokenProvider,appConfigProvider){
    //console.log(data);
    // angular.extend($navbarProvider.defaults,{
    //     activeClass: 'active'
    // });
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
            controller:'HomeController',
            title: 'Início'
        })
        .when('/clients/dashboard',{
            templateUrl:'build/views/client/dashboard.html',
            controller:'ClientDashboardController',
            title: 'Clientes'
        })
        .when('/clients',{
            templateUrl:'build/views/client/listAll.html',
            controller:'ClientsListControllerAll',
            title: 'Clientes'
        })
        .when('/client/new',{
            templateUrl:'build/views/client/new.html',
            controller:'ClientNewController',
            title: 'Clientes'
        })
        .when('/client/:id',{
            templateUrl:'build/views/client/list.html',
            controller:'ClientListController',
            title: 'Clientes'
        })
        .when('/client/:id/edit',{
            templateUrl:'build/views/client/edit.html',
            controller:'ClientEditController',
            title: 'Clientes'
        })
        .when('/client/:id/remove',{
            templateUrl:'build/views/client/remove.html',
            controller:'ClientRemoveController',
            title: 'Clientes'
        })

        .when('/projects/dashboard',{
            templateUrl:'build/views/project/dashboard.html',
            controller:'ProjectDashboardController',
            title: 'Projetos'
        })
        .when('/project/:id/files',{
            templateUrl:'build/views/projectFile/listAll.html',
            controller:'ProjectFileListAllController',
            title: 'Arquivos do Projeto'
        })
        .when('/project/:id/file/new',{
            templateUrl:'build/views/projectFile/new.html',
            controller:'ProjectFileNewController',
            title: 'Arquivos do Projeto'
        })
        .when('/project/:id/file/:fileId/edit',{
            templateUrl:'build/views/projectFile/edit.html',
            controller:'ProjectFileEditController',
            title: 'Arquivos do Projeto'
        })
        .when('/project/:id/file/:fileId/remove',{
            templateUrl:'build/views/projectFile/remove.html',
            controller:'ProjectFileRemoveController',
            title: 'Arquivos do Projeto'
        })
        .when('/project/:id/notes',{
            templateUrl:'build/views/projectNote/listAll.html',
            controller:'ProjectNoteListAllController',
            title: 'Notas do Projeto'
        })
        .when('/project/:id/note/new',{
            templateUrl:'build/views/projectNote/new.html',
            controller:'ProjectNoteNewController',
            title: 'Notas do Projeto'
        })
        .when('/project/:id/note/:noteId',{
            templateUrl:'build/views/projectNote/list.html',
            controller:'ProjectNoteListController',
            title: 'Notas do Projeto'
        })
        .when('/project/:id/note/:noteId/edit',{
            templateUrl:'build/views/projectNote/edit.html',
            controller:'ProjectNoteEditController',
            title: 'Notas do Projeto'
        })
        .when('/project/:id/note/:noteId/remove',{
            templateUrl:'build/views/projectNote/remove.html',
            controller:'ProjectNoteRemoveController',
            title: 'Notas do Projeto'
        })
        .when('/project/:id/tasks',{
            templateUrl:'build/views/projectTask/listAll.html',
            controller:'ProjectTaskListAllController',
            title: 'Tarefas do Projeto'
        })
        .when('/project/:id/task/new',{
            templateUrl:'build/views/projectTask/new.html',
            controller:'ProjectTaskNewController',
            title: 'Tarefas do Projeto'
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
            controller:'ProjectTaskRemoveController',
            title: 'Tarefas do Projeto'
        })
        .when('/project/:id/members',{
            templateUrl:'build/views/projectMember/listAll.html',
            controller:'ProjectMemberListAllController',
            title: 'Membros do Projeto'
        })
        .when('/project/:id/member/new',{
            templateUrl:'build/views/projectMember/new.html',
            controller:'ProjectMemberNewController',
            title: 'Membros do Projeto'
        })
        .when('/project/:id/member/:memberId/remove',{
            templateUrl:'build/views/projectMember/remove.html',
            controller:'ProjectMemberRemoveController',
            title: 'Membros do Projeto'
        })
        .when('/projects',{
            templateUrl:'build/views/project/listAll.html',
            controller:'ProjectListAllController',
            title: 'Projetos'
        })
        .when('/project/new',{
            templateUrl:'build/views/project/new.html',
            controller:'ProjectNewController',
            title: 'Projetos'
        })
        .when('/project/:id',{
            templateUrl:'build/views/project/list.html',
            controller:'ProjectListController',
            title: 'Projetos'
        })
        .when('/project/:id/edit',{
            templateUrl:'build/views/project/edit.html',
            controller:'ProjectEditController',
            title: 'Projetos'
        })
        .when('/project/:id/remove',{
            templateUrl:'build/views/project/remove.html',
            controller:'ProjectRemoveController',
            title: 'Projetos'
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


app.run(['$rootScope','$location', '$window','$http','$modal', 'httpBuffer', 'OAuth','appConfig',
    function($rootScope, $location, $window, $http, $modal, httpBuffer, OAuth, appConfig) {
    $rootScope.$on('$routeChangeStart', function (event, next,current) {
        if (next.$$route.originalPath != '/login' && OAuth.isAuthenticated() == false){
            $location.path('login');
        }
    });

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.pageTitle = current.$$route.title;
        document.title = appConfig.appName+' - '+current.$$route.title;
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
