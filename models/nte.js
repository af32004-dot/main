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

validate: (value)=>{    
if( 
(
Number.isInteger(Number(value.substring(0,3)))
&&
value.substring(3,4)==='-'
&&
Number.isInteger(Number(value.substring(4,value.length)))
) ||
(
Number.isInteger(Number(value.substring(0,2)))
&&
value.substring(2,3)==='-'
&&
Number.isInteger(Number(value.substring(3,value.length)))
)

){return true} else
{return false}

				/*}*/
	}	
/**/

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