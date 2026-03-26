// Express =====================================================
var express = require ('express');
var app = express();

// Parser ======================================================
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Middleware ==================================================
var mWare = require('./middleware');
app.use(mWare);

// Routing =====================================================
//Marinheiros
var MarinheirosRouter = require('./routes/marinheirosRoute');
app.use('/api/marinheiros', MarinheirosRouter);

//Barcos
var BarcosRouter = require('./routes/barcosRoute');
app.use('/api/barcos', BarcosRouter);

//Reservas
var ReservasRouter = require('./routes/reservasRoute');
app.use('/api/reservas', ReservasRouter);

app.get(/.*/, (req,res) => {                     // 404 handling
  res.status(404).send('Endpoint not found.')
});

// Server =====================================================
var port = 8080;
app.listen(port);
console.log("Using port " + port);

module.exports = app;