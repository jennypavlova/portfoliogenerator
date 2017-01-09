// /public/controlllers/portfolio.js
// Portfolio controller
(function () {
  'use strict';

  var debug = false;

  angular
    .module('app')
    .controller('PortfolioCtrl', PortfolioCtrl);
    function PortfolioCtrl($scope, $http) {
      $scope.projects = []
      $scope.newProject = {}

      $scope.printPortfolioEntry = function(entry) {
        return JSON.stringify(entry)
      }

      // when landing on the page, get all portfolio and show them
      $http.get('/api/portfolio')
      .then(function(res) {
        if (debug) console.log("GET /api/portfolio:", JSON.stringify(res.data, null, 2));
        $scope.portfolio = res.data
      }, function(err) {
        console.log('Error: ' + err);
      });

      // when submitting the add form, send the text to the node API
      $scope.createProject = function() {
        $http.post('/api/portfolio/project', $scope.newProject)
        .then(function(res) {
          if (debug) console.log("POST /api/portfolio/project", JSON.stringify(res.data, null, 2));
          $scope.portfolio = res.data
          $scope.newProject = {}
        }, function(res) {
          console.log('Error: ' + res);
        });
      };

      // delete a todo after checking it
      $scope.deleteProject = function(id) {
        $http.delete('/api/portfolio/project/' + id)
        .then(function(res) {
          if (debug) console.log("DELETE /api/portfolio/projects/" + id, JSON.stringify(res.data, null, 2));
          $scope.portfolio = res.data
        }, function(res) {
          console.log('Error: ' + res);
        });
      };
    }
})();