const mongoose = require('mongoose')

module.exports.connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME
    }).then(() => {
      console.log('connected to db')
    }).catch(err => {
      console.log('error occured during db connection : ', err)
    })
  } catch (err) {
    console.log('Error occurred during db connection: ', err)
  }
}

module.exports.mongooseInstance = mongoose
