const express = require("express");
const { auth } = require("../middlewares/auth");
const {CoffeeModel,validateJoi} = require("../models/coffeeModel");
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    let data = await CoffeeModel.find({}).limit(20);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})
 
router.post("/",auth, async(req,res) => {
  let validBody = validateJoi(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let coffee = new CoffeeModel(req.body);
    // הוספת איי די של המשתמש לרשומה לתיעוד 
    coffee.user_id = req.tokenData._id;
    await coffee.save();
    res.json(coffee)
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.put("/:id", auth,async(req,res) => {
  let validBody = validateJoi(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let id = req.params.id;
    // user_id:req.tokenData._id -> המשתמש יוכל לערוך רק רשומות שהוא הוסיף
    let data = await CoffeeModel.updateOne({_id:id,user_id:req.tokenData._id},req.body);
    // modfiedCount אם הצליח נקבל 1
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id", auth, async(req,res) => {
  try{
    let id = req.params.id;
    // user_id:req.tokenData._id -> המשתמש יוכל למחוק רק רשומות שהוא הוסיף
    let data = await CoffeeModel.deleteOne({_id:id,user_id:req.tokenData._id});
    // deletedCount אם הצליח נקבל 1
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

module.exports = router;