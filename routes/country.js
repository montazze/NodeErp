/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 25/11/12
 * Time: 17:34
 */
var View = Mongoose.model('Country');


module.exports = function(app){



    app.get('/country',function(req,res){
          View
              .find({})
              .desc('name')
              .run(function(error,views){
                  if(error) throw error
                  res.render('country/index',{
                      layout: true,
                      title: 'Country',
                      views: views
                  })
              })

      });

}