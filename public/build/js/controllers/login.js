
angular.module('app.controllers')
    .controller('LoginController',['$scope','$location','OAuth',function($scope,$location,OAuth){
        //console.log($scope.user);

        $scope.user = {
            username:'',
            password:''
        };

        $scope.error = {
            message:'',
            error:false
        }
    $scope.login = function(){
        if ($scope.form.$valid){


        OAuth.getAccessToken($scope.user).then(
            //sucesso
            function(){
                $location.path('home');
            },
            //falha
            function (data){
                $scope.error.error=true;
                console.log(data);
                $scope.error.message= data.data.error_description ;
            }
        );}
    };

}]);