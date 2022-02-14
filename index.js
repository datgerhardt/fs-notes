require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { collection } = require('./models/note')

const Note = require('./models/note')


const app = express()
app.use(express.json())
app.use(cors())

const requestLogger= (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

app.use(requestLogger)
app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => 
      res.json(notes)
    )
})

app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id).then(note => {
        if (note){
            res.json(note)
        } else {
            res.status(404).end()
        }
    })
    .catch(err => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
    const changeNote = req.body
    if (!changeNote.content){
       return res.status(400).json({error:"content is missing"}) 
    }

    Note.findByIdAndUpdate(req.params.id, changeNote).then(
        updatedNote => res.json(updatedNote)
    )
    .catch(err => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndRemove( req.params.id).then(
        result => res.status(204).end()   
    )
    .catch(err => next(err) )
})

app.post('/api/notes', (req, res, next) => {
    const body= req.body
    if (body.content === undefined){
       return res.status(400).json({error:"content is missing"}) 
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })
    
    note.save().then(
        savedNote => res.json(savedNote)
    )
    .catch(err => next(err))

})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === 'CastError'){
        return res.status(400).send({error: 'malformatted id'})
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error : err.message })
    }
    next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)    
})
