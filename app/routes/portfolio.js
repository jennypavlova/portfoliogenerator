module.exports = function(router) {
	//Model
  var Project = require("../models/project")

  router.get('/portfolio', function(req, res) {
    // use mongoose to get all projects in the database
    Project.find({
      'user': req.user.id
    }, function (err, projects) {
      if (err) res.send(err)
      console.log('GET /api/portfolio', JSON.stringify(projects, null, 2), '\n', 'user:', req.user);
      res.json({
        user: req.user,
        projects: projects
      });
    });
  });

  router.post('/portfolio/project', function(req, res) {
    req.body.user = req.user.id
    Project.create(req.body, function(err, project) {
      if (err) res.send(err);

      Project.find({
        'user': req.user.id
      },function (err, projects) {
        if (err) res.send(err)

        res.json({
          user: req.user,
          projects: projects
        });
      });
    });
  });

  // delete a project
  router.delete('/portfolio/project/:project_id', function(req, res) {
    Project.remove({
      _id: req.params.project_id,
      user: req.user.id
    }, function(err) {
      if (err) res.send(err);

      Project.find({
        'user': req.user.id
      },function (err, projects) {
        if (err) res.send(err)

        res.json({
          user: req.user,
          projects: projects
        });
      });
    });
  });
}