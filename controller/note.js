const noteRouter = require('express').Router()
const Note = require('../models/note')

// noteRouter.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1>')
//   })

noteRouter.get('', (req, res) => {
    Note.find({}).then(notes =>
    res.json(notes)
    )
})

noteRouter.get('/:id', (req, res, next) => {
    Note.findById(req.params.id).then(note => {
        if (note){
        res.json(note)
        } else {
        res.status(404).end()
        }
    })
        .catch(err => next(err))
})

noteRouter.put('/:id', (req, res, next) => {
    const { content, important }= req.body

    Note.findByIdAndUpdate(req.params.id, { content, important }, { new: true, runValidators: true, context: 'query' } )
        .then(
        updatedNote => res.json(updatedNote)
        )
        .catch(err => next(err))
})

noteRouter.delete('/:id', (req, res, next) => {
    Note.findByIdAndRemove( req.params.id).then(
        () => res.status(204).end()
    )
        .catch(err => next(err) )
    })

    noteRouter.post('', (req, res, next) => {
    const body= req.body
    if (body.content === undefined){
        return res.status(400).json({ error:'content is missing' })
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

module.exports = noteRouter