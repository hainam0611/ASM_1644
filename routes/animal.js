var express = require('express')
const AnimalModel = require('../models/AnimalModel')
var router = express.Router()
router.get('/', async (req, res) =>{
    var animal = await AnimalModel.find()
  res.render('animal/animalList', { animal : animal })
})
router.get('/delete/:id', async (req, res) =>{
  await AnimalModel.findByIdAndDelete(req.params.id);
  res.redirect('/animal')
})
router.get('/add', (req, res) =>{
  res.render('animal/animalAdd')
})
router.post('/add', async (req, res)=>{
  var animal = req.body
  await AnimalModel.create(animal)
  .then(console.log("Added animal"))
  .catch(err => console.log(err))
  res.redirect('/animal')
})
router.get('/edit/:id', async (req, res) => {
  var id = req.params.id
  var animal = await AnimalModel.findById(id)
  res.render('animal/animalEdit', { animal : animal })
});

router.post('/edit/:id', async (req, res) => {
  await AnimalModel.findByIdAndUpdate(req.params.id, req.body)
     .then(console.log('Edit student successfully !'))
     .catch(err => console.log(err));
 res.redirect('/animal');
});
router.post('/search', async(req,res)=>{
  var keyword = req.body.keyword
  console.log(keyword)
  var animals = await AnimalModel.find({name : new RegExp( keyword, "i")}) 
  console.log(animals)
  res.render('animal/animalList', {animal:animals})
})

router.get('/animalDetail/:id', async (req, res) => {
  var id = req.params.id
  var animal = await AnimalModel.findById(id)
  res.render('animal/animalDetail', {animal : animal});
})
module.exports = router
