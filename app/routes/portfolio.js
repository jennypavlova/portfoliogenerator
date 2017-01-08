module.exports = function(router) {
  var Project = require("../models/project")
  var User = require("../models/user")

  var allowAuthenticate = function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.status(401)
      return next(new Error('401'))
    }
    return next()
  }

  var getPortfolio = function(userId, next){
    User.findById(userId, function (err, user) {
      if (err) return next(err)

      Project.find({
        'user': userId
      },function (err, projects) {
        if (err) return next(err)

        var portfolio = {
          user: user,
          projects: projects
        }
        return next(null, portfolio)
      })
    })
  }

  router.get('/portfolio', allowAuthenticate, function(req, res) {
    getPortfolio(req.user.id, function (err, portfolio) {
      if (err) res.send(err)
      console.log('GET /api/portfolio\n', 'userId:', req.user.id, '\n', JSON.stringify(portfolio, null, 2));
      res.json(portfolio)
    })
  })

  router.post('/portfolio/project', allowAuthenticate, function(req, res) {
    req.body.user = req.user.id
    Project.create(req.body, function(err, project) {
      if (err) res.send(err);
      getPortfolio(req.user.id, function (err, portfolio) {
        if (err) res.send(err)
        console.log('GET /api/portfolio\n', 'userId:', req.user.id, '\n', JSON.stringify(portfolio, null, 2));
        res.json(portfolio)
      })
    })
  })

  // delete a project
  router.delete('/portfolio/project/:project_id', allowAuthenticate, function(req, res) {
    Project.remove({
      _id: req.params.project_id,
      user: req.user.id
    }, function(err) {
      if (err) res.send(err);

      getPortfolio(req.user.id, function (err, portfolio) {
        if (err) res.send(err)
        console.log('GET /api/portfolio\n', 'userId:', req.user.id, '\n', JSON.stringify(portfolio, null, 2));
        res.json(portfolio)
      })
    })
  })
}