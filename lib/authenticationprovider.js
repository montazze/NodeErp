/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 16/08/12
 * Time: 23:44
 */


exports.CheckAuth = function(req, res,next){
    if (!req.session.user_id){
        res.redirect('/login');
    } else {
        next(req,res);
    }
}
