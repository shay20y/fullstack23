const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  price: Number,
  cals: Number,
})
exports.FoodModel = mongoose.model("foods", schema)

exports.validateFood = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    price: Joi.number().min(1).max(999).required(),
    cals: Joi.number().min(1).max(9999).required(),
  })
  return joiSchema.validate(_reqBody)
}