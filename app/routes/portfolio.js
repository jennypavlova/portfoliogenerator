module.exports = function(router) {
	//Model
  var Portfolio = require("../models/portfolio")

  router.get('/portfolio', function(req, res) {
    // use mongoose to get all portfolio in the database
    Portfolio.findOne({'user': req.user.id}, function (err, portfolio) {
      if (err) res.send(err)
      console.log('GET /api/portfolio', JSON.stringify(portfolio,null,2), '\n', 'user:', req.user);
      res.json(portfolio);
    });
  });

  // create Portfolio and send back all portfolio after creation
  router.post('/portfolio',
    function(req, res) {
  	console.log('body:', JSON.stringify(req.body))
    // create a Portfolio, information comes from AJAX request from Angular
    Portfolio.create({
      project: req.body,
      user: req.user.id
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
      _id : req.params.portfolio_id,
      user: req.user.id
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