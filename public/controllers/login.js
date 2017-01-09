// /public/controllers/login.js
// Login controller
(function () {
  'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);
    function LoginCtrl($rootScope, $http, $location ) {
      var vm = this;
      vm.login = login;
      console.log("logged in ctrl");
      // Register the login() function
      function login(){
        vm.dataLoading = true;
        $http.post('api/login', {
          username: vm.username,
          password: vm.password,
        })
        .then(function(res) {
          // No error: authentication OK
          console.log("OK");
          $location.url('/portfolio');
          $rootScope.message = 'Authentication successful!';
        }, function(res) {
          // Error: authentication failed
          console.log("ERROR", res, vm.user.username);
          $rootScope.message = 'Authentication failed.';
          $location.url('/');
        });
      };
    }
})();