var io = Io;
var vm = {
    layout: true,
    title: 'Welcome to NodeErp'
}


module.exports = function(app){
    /*
     * GET home page.
     */
    app.get('/', function(req, res){



        res.render('index',vm);


    });

    app.use(function(req, res, next){
          next(new NotFound(req.url))
    })

       // Provide our app with the notion of NotFound exceptions

       function NotFound(path){
           this.name = 'NotFound'
           if (path) {
               Error.call(this, 'Cannot find ' + path)
               this.path = path
           } else {
               Error.call(this, 'Not Found')
           }
           Error.captureStackTrace(this, arguments.callee)
       }

    app.error(function(err, req, res, next){
            if (err instanceof NotFound){
                console.log(err.stack)
                res.render('404', {
                    status: 404,
                    error: err,
                    showStack: app.settings.showStackError,
                    title: 'Oops! The page you requested does not exist'
                })
            }
            else {
                console.log(err.stack)
                res.render('500', {
                    status: 500,
                    error: err,
                    showStack: app.settings.showStackError,
                    title: 'Oops! Something went wrong!'

                })
            }
        })







    io.sockets.on('connection', function (socket) {
        socket.on('set nickname', function (name) {
            socket.set('nickname', name, function () { socket.emit('ready'); });
        });

        socket.on('msg', function () {
            socket.get('nickname', function (err, name) {
                console.log('Chat message by ', name);
            });
        });
    });



}
