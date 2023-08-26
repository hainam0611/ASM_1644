var express = require('express')
const LegoModel = require('../models/legoModel')
var router = express.Router()
router.get('/', async (req, res) =>{
    var lego = await LegoModel.find()
  res.render('lego/legoList', { lego : lego })
});
router.get('/delete/:id', async (req, res) =>{
  await LegoModel.findByIdAndDelete(req.params.id);
  res.redirect('/lego')
})
router.get('/add', (req, res) =>{
  res.render('lego/legoAdd')
})
router.post('/add', async (req, res)=>{
  var lego = req.body;
  await LegoModel.create(lego)
  .then(console.log("Added lego"))
  .catch(err => console.log(err))
  res.redirect('/lego')
})
router.get('/edit/:id', async (req, res)=>{
  var id = req.params.id
  var lego = await LegoModel.findById(id)
  res.render('lego/legoEdit', {lego : lego})
})
router.post('/edit/:id', async (req, res) => {
  var id = req.params.id
  var lego = req.body

  await LegoModel.findByIdAndUpdate(id, lego, { new: true })
      .then(updatedLego => {
          console.log('Edit lego successfully')
      })
      .catch(err => console.log(err))

  res.redirect('/lego')
});
router.post('/search', async(req,res)=>{
  var keyword = req.body.keyword
  console.log(keyword)
  var legos = await LegoModel.find({name : new RegExp( keyword, "i")}) 
  console.log(legos)
  res.render('lego/legoList', {lego:legos})
})
router.get('/legoDetail/:id', async (req, res) => {
  var id = req.params.id
  var lego = await LegoModel.findById(id)
  res.render('lego/legoDetail', {lego : lego})
})



module.exports = router
