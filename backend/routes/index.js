var express = require('express');
var router = express.Router();
const { Task } = require('../models/task');

/* GET home page. */
router.get('/', function(req, res, next) {
  Task.find({}, (err, tasks) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      // res.json('Success');
      res.json(tasks);
    }
  });
});

module.exports = router;
