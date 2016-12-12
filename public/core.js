// public/core.js
var portfolioApp = angular.module('portfolioApp', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get all portfolio and show them
  $http.get('/api/portfolio')
  .success(function(data) {
    $scope.portfolio = data;
    console.log(JSON.stringify(data));
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  // when submitting the add form, send the text to the node API
  $scope.createPortfolio = function() {
    $http.post('/api/portfolio', {
      project: $scope.formData.text
    })
    .success(function(data) {
          $scope.formData = {}; // clear the form so our user is ready to enter another
          $scope.portfolio = data;
        })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  // delete a todo after checking it
  $scope.deletePortfolio = function(id) {
    $http.delete('/api/portfolio/' + id)
    .success(function(data) {
      $scope.portfolio = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };
}