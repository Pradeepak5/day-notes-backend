const mongoose = require('mongoose')
const { modelNames } = require('../utils/constant')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, {
  collection: modelNames.userModel,
  timestamps: true,
  versionKey: false
})

const UserModel = mongoose.model(modelNames.userModel, userSchema)
module.exports = UserModel
