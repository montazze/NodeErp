var io = Io;


module.exports = function(app){
    /*
     * GET home page.
     */
    app.get('/', function(req, res){
        res.render('index',{
            title: 'Welcome to NodeErp'


        });


    });





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
