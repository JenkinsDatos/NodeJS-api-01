const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name: 'courseA' },
    {id: 2, name: 'courseB' },
    {id: 3, name: 'courseC' },
    {id: 4, name: 'courseD' },
    {id: 5, name: 'courseE' },
    {id: 6, name: 'courseF' },
    {id: 7, name: 'courseG' },
    {id: 8, name: 'courseH' }
]

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

router.get('/', async (req, res) => {
  //const genres = await Genre.find().sort('name');
  res.send(courses);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findOneAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
