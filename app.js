
/**
 * Module dependencies.
 */

var port = 3001;


var express = require('express'),
    fs = require('fs'),
    app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/views');
  app.set('routes',__dirname + '/routes');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.set('view options',{layout: false});

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//authentication
app.use(AuthenticationProv = require('./lib/authenticationprovider.js'));

//Logger
exports = Logger = require('./lib/logprovider.js');

// Socket
exports = Io = require('socket.io').listen(app);


// Database
exports = Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost/NodeErp');
exports = Schema = Mongoose.Schema;





//DataModel
exports = Prolob = require('prolob');
exports = Dataprovider = Prolob.Dataprovider;


// Models
var models_path = __dirname + '/models'
var model_files = fs.readdirSync(models_path)
model_files.forEach(function(file){
    if (file == 'user.js')
        User = require(models_path+'/'+file)
    else
        require(models_path+'/'+file)
})


// Routes
var routeFiles = fs.readdirSync(__dirname + '/routes');
routeFiles.forEach(function(file){
    var name = file.substr(0,file.indexOf('.'));
    require('./routes/' + name)(app);
});




//Appmenu
exports = company = 'test company';
exports = username = 'steve mangelschots';
exports = sidemenu = {
        contact:{name:'Contacts'}
      }


// Error handler
//require('./error').boot(app)



// Start server
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
