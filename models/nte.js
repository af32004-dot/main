const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    required: true
  },
 author: {
    type: String,
    minLength: 3,
    required: true
  },
 url: {
    type: String,
    minLength: 3,
    required: true
  },
  likes: {
    type: Number,
    /*minLength: 1,*/
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  } 


/*
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }  /**/

/*
    validate: (value) => {
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

    }
/**/
  
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)