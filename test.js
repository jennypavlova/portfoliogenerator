var request = require('request')
request.post({
	url: 'http://localhost:8080/api/portfolio',
	json: {
    name: "project",
  	companyName: "client",
  	description: "Some String",
  	technologies: "technologies"
	}
}, function(err, res, body) {
		if(err) throw err
		console.log(JSON.stringify(res.body, null, 2));
	}
)
