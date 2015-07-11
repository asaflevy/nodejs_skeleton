'use strict';

module.exports = {
    app : {
        env: process.env.NODE_ENV || 'development',
        port: process.env.port || '3000',
        templateEngine: 'swig'
    }
}