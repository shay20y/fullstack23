const mongoose = require("mongoose");
const Joi = require("joi");


const xboxSchema = new mongoose.Schema({
  Game:String,
  Genre:String,
  Year:Number,
  Dev:String,
  Publisher:String,
  date_created:{
    type:Date, default:Date.now
  }
})

exports.XboxGameModel = mongoose.model("xbox_games",xboxSchema)

exports.validateGame = (_reqBody) => {
  let joiSchema = Joi.object({
    Game:Joi.string().min(2).max(150).required(),
    Genre:Joi.string().min(2).max(150).required(),
    Year:Joi.number().min(1970).max(2030).required(),
    Dev:Joi.string().min(2).max(150).required(),
    Publisher:Joi.string().min(2).max(150).required(),
  })
  return joiSchema.validate(_reqBody)
}