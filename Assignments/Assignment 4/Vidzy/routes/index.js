var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/vidzy');
var collection = db.get('videos');

/* GET home page. Should redirect you to /videos */
router.get('/', function(req, res, next) {
  res.redirect('/videos');
});

/* GET /videos , this will be the homepage showing list of all videos we use */
router.get('/videos', function(req, res) {
    var usertitle = req.query.title;
    var usergenre = req.query.genre;
    var regTitle = new RegExp(usertitle, 'i');
    var regGenre = new RegExp(usergenre, 'i');
    if ((!usertitle && !usergenre) || (usertitle == "" && usergenre == "all")) {
      collection.find({}, function (err, videos) {
        if (err) throw err;
        res.render("index", { results: videos });
      }); 
    }
    else if (usertitle != "" && usergenre == "all") {
      collection.find({title : regTitle}, function(err, videos) { 
        if (err) {
            throw err;
        }
         res.render('index', { results : videos });
      });
    }
    else if (usertitle != "" && usergenre != "all") {
      collection.find({title : regTitle, genre: regGenre}, function(err, videos) { 
        if (err) {
            throw err;
        }
         res.render('index', { results : videos });
      });
    }
    else if (usertitle == "" && usergenre != "all") {
      collection.find({genre: regGenre}, function(err, videos) { 
        if (err) {
            throw err;
        }
         res.render('index', { results : videos });
      });
    }
});

/* GET /videos/new , this is the page where the user can insert a new video */
router.get('/videos/new', function(req, res, next) {
  res.render('new');
});

/* GET api/videos/id , this is for getting information on a specific video */
router.get('/videos/:id', function(req, res) {
  collection.findOne({_id: req.params.id}, function(err, video) {
      if (err) {
          throw err;
      }
      res.render('show', { video : video });
  });
});

/* POST api/videos , this is for adding a new video */
router.post('/videos', function(req, res) {
  collection.insert({
      title : req.body.title,
      genre : req.body.genre,
      description : req.body.description,
      image : req.body.image
  }, function(err, video) {
      if (err) {
          throw err;
      }
      res.redirect('/');
  });
});

/* DELETE api/videos/id , this is for deleting the current video */
router.delete('/videos/:id', function(req, res) {
  collection.remove({_id: req.params.id},
  function(err, video) {
      if (err) {
          throw err;
      }
      res.redirect('/');
  });
});

/* GET api/videos/id/edit , to get the form for the current video to be edited */
router.get('/videos/:id/edit', function(req, res, next) {
  collection.findOne({_id: req.params.id}, function(err, video) {
    if (err) {
        throw err;
    }
    res.render('edit', { video : video });
  });
});

/* PUT api/videos/id , this is for updating the current video */
router.put('/videos/:id', function(req, res) {
  collection.update({_id: req.params.id}, 
  { $set: {
      title : req.body.title,
      genre : req.body.genre,
      description : req.body.description,
      image: req.body.image
  }},
  function(err, video) {
      if (err) {
          throw err;
      }
      res.redirect('/');
  });
});

module.exports = router;