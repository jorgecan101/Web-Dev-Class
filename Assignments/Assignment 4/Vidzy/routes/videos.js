var express = require('express');
var router = express.Router();

var monk = require('monk');
//we will use monk to initialize the database connection
var db = monk('localhost:27017/vidzy'); //gives us the database object
var collection = db.get('videos');

/* GET api/videos */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' }); //render is for returning a template file
  //something like find could filter and do like {'genre':'animation'}
    collection.find({}, function(err, videos) { 
        if (err) {
            throw err;
        }
        res.json(videos);
    });
});

/* GET api/videos/id */
router.get('/:id', function(req, res) {
    collection.findOne({_id: req.params.id}, function(err, video) {
        if (err) {
            throw err;
        }
        res.json(video);
    });
});

/* POST api/videos */
router.post('/', function(req, res) {
    collection.insert({
        title : req.body.title,
        genre : req.body.genre,
        description : req.body.description

    }, function(err, video) {
        if (err) {
            throw err;
        }
        //if insert was successful, we return the new video object as a response
        res.json(video);
    });
});

/* PUT api/videos/id */
router.put('/:id', function(req, res) {
    collection.update({_id: req.params.id}, 
    { $set: {
        title : req.body.title,
        genre : req.body.genre,
        description : req.body.description
    }},
    function(err, video) {
        if (err) {
            throw err;
        }
        //if update was successful, then return the updated video object as a response
        res.json(video);
    });
});

/* DELETE api/videos/id */
router.delete('/:id', function(req, res) {
    collection.remove({_id: req.params.id},
    function(err, video) {
        if (err) {
            throw err;
        }
        res.json(video);
    });
});


module.exports = router;


//CRUD

// query string ? is at the end of url