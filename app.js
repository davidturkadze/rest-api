const express = require('express');
const path = require('path')
const { v4 } = require('uuid')
const app = express();


// our database
let CONTACTS = [
    { id: v4(), name: 'Max Mustermann', value: '+7-921-100-20-30', marked: false }
]

// this enables to work with JSON format
app.use(express.json())

// GET
app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS)
})

//POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false }
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

//DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json({ message: 'Contact has been deleted' })
})

//PUT (entirely updates the model)
app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id)
        //rewrite contact with index idx with requested (res.body)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
})

//this requests must stay at bottom

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log("Server has been started on Port 3000..."));