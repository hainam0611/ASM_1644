const express = require('express');
const router = express.Router();
const RobotModel = require('../models/robotModel'); 
const AnimalModel = require('../models/AnimalModel'); 
const LegoModel = require('../models/legoModel'); 

router.get('/', async (req, res) => {
  const robots = await RobotModel.find();
  const animals = await AnimalModel.find();
  const legos = await LegoModel.find();

  res.render('customer/index', {
    title: 'ATN Store',
    robotList: robots,
    animalList: animals,
    legoList: legos
  });
});


module.exports = router;