const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

/*console.log('connecting to', url)*/
mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
   name: {
    type: String,
    minLength: 3,
    required: true
  },
  num: {
    type: String,
    minLength: 8,
    required: true,
validate: {    
validator: function(v) {
        return /\d{3}-\d{5}/||/\d{2}-\d{5}/.test(v);
	}}
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)