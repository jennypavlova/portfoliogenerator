module.exports = function(router) {
	//Model
	var Portfolio = require("../models/portfolio") 

	router.post('/portfolio', function(req, res, next){
		Portfolio.create(req.body, function(err, portfolio){
	        if(err){
	          console.log(err)
	          return next(err);
	        }
	        res.json(portfolio);
	        console.log(portfolio);
		    // save the portfolio and check for errors
			return next();
		});
		portfolio.save(function(err) {
			if (err)
				res.send(err); 
			res.json({ message: 'Portfolio created!' });
		})
	 }) 
	//create a portfolio (accessed at POST http://localhost:8080/api/portfolio)
	// router.post('/portfolio', function(req, res) {
	//     var portfolio = new Portfolio({ 
	//       project:{
	//         name: "name",
	//         client: "client"
	//       }
	//     });
	// })
    router.get('/portfolio', function(req, res) {
		Portfolio.find(function(err, portfolio) {
		  if (err)
		    res.send(err);
		  res.json(portfolio);
		})
	})
}