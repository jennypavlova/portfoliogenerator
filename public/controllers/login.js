// /public/controllers/login.js
// Login controller 
app.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};
  console.log("logged in ctrl");
  // Register the login() function
  $scope.login = function(){
    $http.post('api/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .then(function(res) {
      // No error: authentication OK
      console.log("OK");
      $rootScope.message = 'Authentication successful!';
      $location.url('/portfolio');
    }, function(res) {
      // Error: authentication failed
      console.log("ERROR", res, $scope.user.username);
      $rootScope.message = 'Authentication failed.';
      $location.url('/');
    });
  };
});