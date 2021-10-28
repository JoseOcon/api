var express = require('express');
var path = require('path');
var logger = require('morgan');

var twitterRouter = require('./routes/twitter')

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    next();
});

app.use('/twitter', twitterRouter);
app.get('/calendar', (req,res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
})

/**
 * ERROR HANDLER
 */
 app.use(function(err, req, res, next) {
    res.status(err.status || 500)
        .json({ error: err.message });
});
module.exports = app;