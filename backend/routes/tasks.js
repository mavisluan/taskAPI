var express = require('express');
var router = express.Router();
const { Task } = require('../models/task');
const _ = require('lodash');

/* GET users listing. */
// GETALL
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ });
    res.send({tasks});
  } catch(e) {
    res.status(400).send(e)
  }
});

// GETONE
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
    });

    if(!task) {
      return res.status(404).send();
    }
    res.send({task});
  } catch(e) {
    res.status(400).send();
  }
});


// POST
router.post('/', async (req, res) => {
  const { title, description, completed } = req.body;
  const task = new Task({ title, description, completed });

  try {
    const doc = await task.save();
    res.send(doc);
  } catch(e) {
    res.status(400).send(e);
  }
});


// DELETE
router.delete(`/:id`, async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findOneAndRemove({
      _id: id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send({task});
  } catch(e) {
    res.status(400).send();
  }
});


// UPDATE
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  let { title, description, completed } = req.body;
  if(_.isBoolean(completed) && completed) {
    req.body.completedAt = new Date().getTime();
  } else {
    req.body.completed = false;
    req.body.completedAt = null;
  }

  try {
    const task = await Task.findOneAndUpdate({
      _id: id,
    }, {$set: req.body }, {new: true});

    if(!task) {
      return res.status(404).send();
    }
    res.send({task});
  } catch(e) {
    res.status(400).send(e);
  }
})


module.exports = router;
