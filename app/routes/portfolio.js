module.exports = function(router) {
	//Model
	var Portfolio = require("../models/portfolio")

  router.get('/portfolio', function(req, res) {
    // use mongoose to get all portfolio in the database
    Portfolio.find(function(err, portfolio) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) res.send(err)
        res.json(portfolio); // return all portfolio in JSON format
      console.log(portfolio)
    });
  });

  // create Portfolio and send back all portfolio after creation
  router.post('/portfolio', function(req, res) {
  	console.log(JSON.stringify(req.body))
    // create a Portfolio, information comes from AJAX request from Angular
    Portfolio.create({
      project: req.body
    }, function(err, portfolio) {
      if (err) res.send(err);
      // get and return all the portfolio after you create another
      Portfolio.find(function(err, portfolio) {
        if (err) res.send(err)
        res.json(portfolio);
      });
    });
  });

  // delete a portfolio
  router.delete('/portfolio/:portfolio_id', function(req, res) {
    Portfolio.remove({
      _id : req.params.portfolio_id
    }, function(err, portfolio) {
      if (err) res.send(err);

      // get and return all the portfolio after you create another
      Portfolio.find(function(err, portfolio) {
        if (err) res.send(err)
        res.json(portfolio);
      });
    });
  });
}