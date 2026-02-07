/*require('dotenv').config()*/
const express = require('express')
const morgan = require('morgan')
const Note = require('./models/nte')

const app = express()
app.use(morgan('tiny'))

const cors = require('cors')

app.use(cors())


app.use(express.static('dist'))


morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :body'))

const requestLogger = (request, response, next) => {
 
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.num) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

/*
console.log ('find',body.name,'find2', Note.find({}).then(notes => {    response.json(notes)  }))
  if (Note.find(body.name).length!==0) {
    return response.status(400).json({ 
      error: 'nome già presente' 
    })
  }
*/

  const note = new Note({
    name: body.name,
    num: body.num || '0',
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  response.send('<p>ci sono '+ notes.length + ' persone</p><p>' + Date() + '</p>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
	if(note) {
    response.json(note)
        } else {
  	response.status(404).end()
        }
  })
.catch(error => next(error))
   
})

app.put('/api/notes/:id', (request, response, next) => {
  const { name, num } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.name = name
      note.num = num

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT /* || 3001 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}


app.use(errorHandler)
