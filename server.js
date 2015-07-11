var config= require('./server/config/config'),
app = require('./server/config/express')();

app.listen(config.app.port);
console.log('Server started on port : ',config.app.port);