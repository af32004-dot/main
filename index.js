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


/*
//mangoooseeee
const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.argv[2]
const url = `mongodb+srv://af32004_db_user:${password}@cluster0.0re4fso.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  name: String,
  num: String,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.id
  }
})

const Note = mongoose.model('Note', noteSchema)
//mangoooseeee
*/

/*
const note = new Note({
  name: nm,
  num: nb,
})
*/

/*
let notes = [
   { 
      "id": "1",
      "name": "Arto Hellas", 
      "num": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "num": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "num": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "num": "39-23-6423122"
    }
]

*/

const requestLogger = (request, response, next) => {
 
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)


const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}


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

/*
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


  if (notes.filter(np=>np.name===body.name).length!==0) {
    return response.status(400).json({ 
      error: 'nome già presente' 
    })
  }


  const persona = {
    name: body.name,
    num: body.num || '00',
    id: generateId(),
  }

  notes= notes.concat(persona)

  response.json(persona)
})
*/

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

/*
app.get('/notes', (request, response) => {
  response.json(notes)
})
*/

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

/*
app.get('/notes/:id', (request, response) => {
  const id = request.params.id
  const persona = notes.find(nt => nt.id === id)

 if (persona) {
    response.json(persona)
  } else {
    response.status(404).end()
  }
})
*/

app.put('/notes/:id', (request, response) => {
  const id = request.params.id
  const body = request.body

  if (!body.num) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  
  const persona = {
    name: body.name,
    num: body.num || '00',
    id: id
  }

  notes[id-1]= persona

  response.json(persona)
})


app.delete('/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(nt => nt.id !== id)

  response.status(204).end()
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT /* || 3001 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})
