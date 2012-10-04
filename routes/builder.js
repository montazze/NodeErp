/**
 * Company: OfficeSoft
 * User: smangelschots
 * Date: 27/08/12
 * Time: 23:51
 */


var View = Mongoose.model('View');


module.exports = function(app){

    app.param('id', function(req,res,next, id){
        View
            .findOne({ _id: req.params.id })
            .run(function(err,view){
                if(err) return next (err)
                if(!view) return next()
                req.view = view
                next()
            })

    });

    // CREATE
    app.post('/builder', function(req, res){
        var view = new View()

        view.name = req.param('name');

        view.save(function(err){
            if(err) {
                res.render("builder/new",{
                    title: 'New view',
                    view: view
                })
            }
            else{
                req.flash('notice','Create successfully')
                res.redirect('/builder/'+view._id)
            }
        });

    });

    // UPDATE
    app.post('/builder/:id',function(req,res){
        var view = req.view;
        view.name = req.body.view.name


        view.save(function(err,doc){
            if(err){
                res.render('builder/edit',{
                    title: "Edit view",
                    view: view
                });
            }else{
                req.flash('notice','Update successfully')
                res.redirect('/view/'+contact._id)
            }
        });
    })


    // ADD
    app.get('/builder/new', function(req, res) {
        res.render('builder/new', { locals: {
            title: 'New view',
            view:  new View({})
        }
        });
    });

    // EDIT
    app.get('/builder/:id/edit', function(req, res) {
        res.render('builder/edit',
            {
                title: 'Edit view',
                view: req.view
            });
    });


    // SHOW
    app.get('/builder/:id',function(req,res){
        res.render('builder/show',{
            title: 'Show view',
            view: req.view
        })

    });

    // DELETE
    app.get('/builder/delete/:id', function(req, res){
        var view = req.view
        view.remove(function(err){
            req.flash('notice', 'Deleted successfully')
            res.redirect('/builder')
        })
    })

    // READ
    app.get('/builder',function(req,res){
        View
            .find({})
            .desc('name')
            .run(function(error,views){
                if(error) throw error
                res.render('builder/index',{
                    title: 'Builder',
                    views: views
                })
            })

    });

}