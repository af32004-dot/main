const notesRouter = require('express').Router()
const Blog = require('../models/nte')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
//const userExtractor= require('../utils/middleware').userExtractor

const tokenExtract = middleware.tokenExtractor 

/*= request => {
const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}*/

/**/
notesRouter.get('/', async (request, response) => { 
  const userid= middleware.userExtractor (request, response)
  const user = await User.findById(userid)
  if (!user) {
    return response.status(400).json({ error: 'you need to be logged in' })
  } 

/*
   const notes = await Blog
       .find({user: user.id}).populate('user',{ username: 1, name: 1 })
*/

console.log('request',request.token)
    const notes = await Blog.find({})
    response.status(201).json(notes)
  })


notesRouter.get('/:id', async (request, response) => {
  const note = await Blog.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})


notesRouter.get('/user/:id', async (request, response) => {
  const note = await Blog.find({user: request.params.id})
    if (note) {
    response.json(note )
  } else {
    response.status(404).end()
  }
})


/**/

notesRouter.post('/',  async (request, response) => {

  const body = request.body
  const userid= middleware.userExtractor (request, response)

  const user = await User.findById(userid)

  
console.log('user:', user)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id	
  })

  const savedNote = await blog.save()
  user.blogs = user.blogs.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote )
})


notesRouter.delete('/:id', async (request, response) => {
 const userid= middleware.userExtractor (request, response)
  const user = await User.findById(userid)
  if (!user) {
    return response.status(400).json({ error: 'you need to be logged in' })
  }

  const dacanc= await Blog.findById(request.params.id)

//console.log ('dacanc',JSON.stringify(dacanc.user))
//console.log ('uid',userid )

  if (JSON.stringify(dacanc.user)===JSON.stringify(userid)){
	await Blog.findByIdAndDelete(request.params.id)
         console.log('cancellato')
	response.status(204).end()
  } else
  { 
        console.log("mancano i privilegi")
	return response.status(400).json({ error: 'you dont have the privilege do delete this record' })
  }
})
	

notesRouter.put('/:id', async (request, response, next) => {
  /*const { name, num } = request.body*/

const userid= middleware.userExtractor (request, response)
  const user = await User.findById(userid)
  if (!user) {
    return response.status(400).json({ error: 'you need to be logged in' })
  }

const damod= await Blog.findById(request.params.id)

if (JSON.stringify(damod.user)===JSON.stringify(userid)){
	const bg= await Blog.findById(request.params.id)

const body = request.body
    
      if (!bg) {
        return response.status(404).end()
      }

      bg.title = body.title
      bg.author = body.author
      bg.url= body.url
      bg.likes = body.likes

      return bg.save().then((updatedNote) => { response.json(updatedNote)
      })
	response.status(204).end()
  } else
  { 
        console.log("mancano i privilegi")
	return response.status(400).json({ error: 'you dont have the privilege do modify this record' })
  }

   
  //  .catch(error => next(error))
})

notesRouter.put('/likes/:id', (request, response, next) => {
  const body = request.body

  Blog.findById(request.params.id)
    .then(bg => {
      if (!bg) {
        return response.status(404).end()
      }

     /* bg.title = bg.title
      bg.author = bg.author
      bg.url= bg.url*/
      bg.likes = bg.likes + 1

      return bg.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})



module.exports = notesRouter