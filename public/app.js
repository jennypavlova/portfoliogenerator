'use strict';

/**********************************************************************
 * Angular Application
 **********************************************************************/
var app = angular.module('app', ['ngResource', 'ngRoute'])
  .config(function($routeProvider, $locationProvider, $httpProvider) {
    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('api/loggedin').then(function(res){
        var user = res.data
        // Authenticated
        if (user !== '0') {
          $rootScope.userLoggedIn = true
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();
        // Not Authenticated
        } else {
          $rootScope.userLoggedIn = false
          $rootScope.message = 'You need to log in.';
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $location.url('!#/login');
        }
      });

      return deferred.promise;
    };
    //================================================

    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });
    //================================================

    //================================================
    // Define all the routes
    //================================================
    $routeProvider
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'vm'
      })
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/portfolio/preview', {
        templateUrl: 'views/preview.html',
        controller: 'PortfolioCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
    //================================================

  }) // end of config()
  .run(function($location, $rootScope, $http){
    $rootScope.message = '';
    $rootScope.userLoggedIn = false;

    $rootScope.isActive = function (route) {
      return route === $location.path();
    }

    // Logout function is available in any pages
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $rootScope.userLoggedIn = false;
      $http.post('/api/logout');
      $location.url('/');
    };
  });
