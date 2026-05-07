const express = require('express');
const quotesRoutes = require('./src/routes/quotes.routes');

const app = express();

app.use(express.json());
app.use('/api/v1/quotes', quotesRoutes);

module.exports = app;