const express = require('express');
const router = express.Router();
const quotesController = require('../controllers/quotes.controller');

router.get('/random', quotesController.getRandomQuote);
router.post('/favorites', quotesController.addFavorite);
router.get('/favorites', quotesController.getFavorites);
router.delete('/favorites/:id', quotesController.deleteFavorite);

module.exports = router;