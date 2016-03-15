var appGitHub=angular.module('gitHubSts',[]);

appGitHub.controller('myCtrl', function($scope,$http) {
	$http.get('/api/currentStatus')
        .success(function(data) {
			$scope.currentStatus=data.status;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
		
	$http.get('/api/availability')
        .success(function(data) {
            $scope.availability = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
		
		
});
