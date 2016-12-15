// /public/controlllers/portfolio.js
// Portfolio controller
app.controller('PortfolioCtrl', function ($scope, $http) {
  $scope.formData = {};
  // when landing on the page, get all portfolio and show them
  $http.get('/api/portfolio')
  .then(function(res) {
    $scope.portfolio = res.data;
    console.log(JSON.stringify(res.data));
  }, function(err) {
    console.log('Error: ' + err);
  });

  // when submitting the add form, send the text to the node API
  $scope.createPortfolio = function() {
    $http.post('/api/portfolio', {
      project: $scope.formData.text
    })
    .then(function(res) {
      $scope.formData = {}; // clear the form so our user is ready to enter another
      $scope.portfolio = res.data;
    }, function(res) {
      console.log('Error: ' + res);
    });
  };

  // delete a todo after checking it
  $scope.deletePortfolio = function(id) {
    $http.delete('/api/portfolio/' + id)
    .then(function(res) {
      $scope.portfolio = res.data;
      console.log(data);
    }, function(res) {
      console.log('Error: ' + res);
    });
  };
})