const express = require("express");
const { validateFood, FoodModel } = require("../models/foodModel");
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    let data = await FoodModel.find({}).limit(20);
    res.json(data)
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/", async(req,res) => {
  let validBody = validateFood(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let food = new FoodModel(req.body);
    await food.save();
    res.json(food);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id", async(req,res) => {
  try{
    let id = req.params.id;
    let data = await FoodModel.deleteOne({_id:id});
    // deletedCount אם הצליח נקבל 1
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

module.exports = router;