angular.module('app.controllers')
    .controller('HomeController',['$scope','Project','$pusher','$cookies','$timeout',function($scope,Project,$pusher,$cookies,$timeout  ){

        Project.query({
            orderBy: 'created_at',
            sortedBy: 'desc',
            limit: 8
        },function(response){
            $scope.projects = response.data;
        });

        $scope.tasks = [];
        var pusher = $pusher(window.client);
        var channel = pusher.subscribe('user.' + $cookies.getObject('user').id);
        channel.bind('CodeProject\\Events\\TaskWasIncluded',
            function (data) {
                if ($scope.tasks.length == 6) {
                    $scope.tasks.splice($scope.tasks.length - 1, 1);
                }
                $timeout(function () {
                    $scope.tasks.unshift(data.task);
                }, 1000);
            }
        );


    }]);