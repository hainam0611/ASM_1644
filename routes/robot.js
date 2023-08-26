var express = require('express')
const RobotModel = require('../models/robotModel')
var router = express.Router()
router.get('/', async (req, res) =>{
    var robot = await RobotModel.find()
  res.render('robot/robotList', { robot : robot })
});
router.get('/delete/:id', async (req, res) =>{
  await RobotModel.findByIdAndDelete(req.params.id)
  res.redirect('/robot')
})
router.get('/add', (req, res) =>{
  res.render('robot/robotAdd')
})
router.post('/add', async (req, res)=>{
  var robot = req.body
  await RobotModel.create(robot)
  .then(console.log("Added robot"))
  .catch(err => console.log(err))
  res.redirect('/robot')
})
router.get('/edit/:id', async (req, res)=>{
  var id = req.params.id
  var robot = await RobotModel.findById(id)
  res.render('robot/robotEdit', {robot :robot})
})
router.post('/edit/:id', async (req, res) => {
  var id = req.params.id
  var robot = req.body

  await RobotModel.findByIdAndUpdate(id, robot, { new: true })
      .then(updatedRobot => {
          console.log('Edit robot successfully')
      })
      .catch(err => console.log(err))

  res.redirect('/robot')
});
router.post('/search', async(req,res)=>{
  var keyword = req.body.keyword
  console.log(keyword)
  var robots = await RobotModel.find({name : new RegExp( keyword, "i")}) 
  console.log(robots)
  res.render('robot/robotList', {robot:robots})
})
router.get('/robotDetail/:id', async (req, res) => {
  var id = req.params.id
  var robot = await RobotModel.findById(id)
  res.render('robot/robotDetail', {robot : robot})
})



module.exports = router
