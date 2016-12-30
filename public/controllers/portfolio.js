// /public/controlllers/portfolio.js
// Portfolio controller
(function () {
  'use strict';

  var debug = false;

  angular
    .module('app')
    .controller('PortfolioCtrl', PortfolioCtrl);
    function PortfolioCtrl($scope, $http) {
      $scope.portfolios = []
      $scope.newPortfolio = {}

      $scope.printPortfolioEntry = function(entry) {
        return JSON.stringify(entry)
      }

      // when landing on the page, get all portfolio and show them
      $http.get('/api/portfolio')
      .then(function(res) {
        if (debug) console.log("GET /api/portfolio:", JSON.stringify(res.data, null, 2));
        $scope.portfolios = res.data
      }, function(err) {
        console.log('Error: ' + err);
      });

      // when submitting the add form, send the text to the node API
      $scope.createPortfolio = function() {
        $http.post('/api/portfolio', $scope.newPortfolio)
        .then(function(res) {
          if (debug) console.log("POST /api/portfolio/", JSON.stringify(res.data, null, 2));
          $scope.portfolios = res.data
          $scope.newPortfolio = {}
        }, function(res) {
          console.log('Error: ' + res);
        });
      };

      // delete a todo after checking it
      $scope.deletePortfolio = function(id) {
        $http.delete('/api/portfolio/' + id)
        .then(function(res) {
          if (debug) console.log("DELETE /api/portfolio/" + id, JSON.stringify(res.data, null, 2));
          $scope.portfolios = res.data
        }, function(res) {
          console.log('Error: ' + res);
        });
      };
    }
})();