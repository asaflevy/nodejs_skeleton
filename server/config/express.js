'use strict'
var express = require('express'),
    config = require('./config'),
    path = require('path'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    stylus  = require('stylus'),
    swig = require('swig'),
    consolidate = require('consolidate');

module.exports = function () {
    var app = express();
    app.engine('html', consolidate[config.app.templateEngine]);

    // Set views path and view engine
    app.set('view engine', 'html');
    app.set('views',  path.resolve('./server/views'));

    function compile(str,path){
        return stylus(str).set('filename',path);
    }

    app.use(stylus.middleware(
        {
            src: __dirname + '/public',
            compile: compile
        }
    ));



// Environment dependent middleware
    if (config.app.env === 'development') {
        // Enable logger (morgan)
        app.use(morgan('dev'));

        // Disable views cache
        app.set('view cache', false);
    } else if (config.app.env === 'production') {
        app.locals.cache = 'memory';
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

// CookieParser should be above session
    app.use(cookieParser());

    app.use(express.static(path.resolve('./public')));
    app.get('/partials/:partialPath', function(req, res) {
        res.render('partials/' + req.params.partialPath);
    });

    app.get('*',function(req,res){
        res.render('index');
    })

    // Return Express server instance
    return app;
}