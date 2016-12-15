app.controller('HeaderCtrl', function($scope, $rootScope, $http, $location) {

	function HeaderCtrl($scope, $location) { 
		$scope.isActive = function (viewLocation) { 
		    return viewLocation === $location.path();
		};
	}
}