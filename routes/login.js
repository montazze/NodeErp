/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 16/08/12
 * Time: 23:42
 */
var User = Mongoose.model("User");


module.exports = function(app){

    app.get('/login', function (req, res) {
        res._render('login/new',{locals: {
            title: 'New login',
            user: new User({})
        }})});


    app.post('/login', function (req, res) {
        var post = req.body;
        if (post.user == 'john' && post.password == 'johnspassword') {
            req.session.user_id = johns_user_id_here;
            res.redirect('/my_secret_page');
        } else {
            res.send('Bad user/pass');
        }
    });

}