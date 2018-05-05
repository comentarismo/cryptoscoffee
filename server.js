var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
// var config = require('./webpack.config')
const request = require('superagent');
var express = require('express');

var app = express();

// var app = new (require('express'))()


var public_path = express.static(__dirname + '/public');
var port = 3000

// var compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
// app.use(webpackHotMiddleware(compiler))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(public_path);


app.get('/news/operator/:table', (req, res) => {

    var table = req.params.table

    console.info('table ' + table);


    request
        .get('https://www.comentarismo.com/gapi_range/news/operator/'+table+'/0/10?sort=date&order=desc&range=10')
        //.query({ action: 'edit', city: 'London' }) // query string
        //.use(prefix) // Prefixes *only* this request
        .end((err, resp) => {
            // Do something
            // console.log('SERVER resp.text => ', resp.text);
            res.send(resp.text);
        });


})

// app.use(function (req, res) {
//     res.sendFile(__dirname + '/index.html')
// })

const server = app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info(__dirname + "==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})


module.exports = server;