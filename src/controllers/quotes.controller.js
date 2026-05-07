const quotesService = require('../services/quotes.service');

async function getRandomQuote(req, res) {
  try {
    const quote = await quotesService.fetchRandomQuote();
    return res.status(200).json(quote);
  } catch (error) {
    return res.status(503).json({
      message: 'Servicio externo no disponible. Intente más tarde.',
    });
  }
}

function getFavorites(req, res) {
  const favorites = quotesService.getAllFavorites();
  return res.status(200).json({ favorites });
}

function addFavorite(req, res) {
  const { quote, author } = req.body;

  if (!quote || !author) {
    return res.status(400).json({
      message: 'Los campos "quote" y "author" son obligatorios.',
    });
  }

  const favorite = quotesService.addFavorite(quote, author);
  return res.status(201).json({ message: 'Frase agregada a favoritos.', favorite });
}

function deleteFavorite(req, res) {
  const { id } = req.params;
  const result = quotesService.deleteFavoriteById(id);

  if (result === null) {
    return res.status(404).json({
      message: `No se encontró un favorito con id ${id}.`,
    });
  }

  return res.status(200).json({
    message: `Favorito con id ${id} eliminado correctamente.`,
  });
}

module.exports = { getRandomQuote, getFavorites, addFavorite, deleteFavorite };