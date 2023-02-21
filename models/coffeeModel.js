const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  price: Number,
  ml: Number,
  img_url: String,
  date_created: {
    type: Date, default: Date.now
  },
  user_id:String
})
exports.CoffeeModel = mongoose.model("coffees", schema)

exports.validateJoi = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    price: Joi.number().min(1).max(999).required(),
    ml: Joi.number().min(1).max(9999).required(),
    img_url: Joi.string().min(2).max(500).allow(null, ""),
  })
  return joiSchema.validate(_reqBody)
}