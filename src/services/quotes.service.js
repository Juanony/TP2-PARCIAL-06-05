const fs = require('fs');
const path = require('path');

const FAVORITES_PATH = path.join(__dirname, '../../data/favorites.json');

function readFavorites() {
  if (!fs.existsSync(FAVORITES_PATH)) {
    fs.writeFileSync(FAVORITES_PATH, '[]', 'utf-8');
  }
  return JSON.parse(fs.readFileSync(FAVORITES_PATH, 'utf-8'));
}

function writeFavorites(favorites) {
  fs.writeFileSync(FAVORITES_PATH, JSON.stringify(favorites, null, 2), 'utf-8');
}

async function fetchRandomQuote() {
  const response = await fetch('https://zenquotes.io/api/random');
  if (!response.ok) throw new Error('Error en la API externa');
  const data = await response.json();
  return { quote: data[0].q, author: data[0].a };
}

function getAllFavorites() {
  return readFavorites();
}

function addFavorite(quote, author) {
  const favorites = readFavorites();
  const newFavorite = {
    id: Date.now(),
    quote,
    author,
    createdAt: new Date().toISOString(),
  };
  favorites.push(newFavorite);
  writeFavorites(favorites);
  return newFavorite;
}

function deleteFavoriteById(id) {
  const favorites = readFavorites();
  const index = favorites.findIndex((f) => f.id === Number(id));
  if (index === -1) return null;
  favorites.splice(index, 1);
  writeFavorites(favorites);
  return true;
}

module.exports = { fetchRandomQuote, getAllFavorites, addFavorite, deleteFavoriteById };