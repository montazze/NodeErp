var Contact = Mongoose.model('Contact');
var logger = Logger;

module.exports = function(app){

    app.param('id', function(req,res,next, id){
        Contact
            .findOne({ _id: req.params.id })
            .run(function(err,contact){
                if(err) return next (err)
                if(!contact) return next()
                req.contact = contact
                next()
            })
    });



    // CREATE
    app.post('/contact', function(req, res){
        var contact = new Contact()

        contact.name = req.param('name');
        contact.surname =   req.param('surname');
        contact.save(function(err){
            if(err) {
                res.render("contact/new",{
                    title: 'New Contact',
                    contact: contact
                })
            }
            else{
                req.flash('notice','Create successfully')
                res.redirect('/contact/'+contact._id)
            }
        });

    });

    // UPDATE
    app.post('/contact/:id',function(req,res){
        var contact = req.contact;
        contact.name = req.body.contact.name
        contact.surname = req.body.contact.surname;

        contact.save(function(err,doc){
            if(err){
                res.render('contact/edit',{
                    title: "Edit contact",
                    contact: contact
                });
            }else{
                req.flash('notice','Update successfully')
                res.redirect('/contact/'+contact._id)
            }
        });
    })

    // ADD
    app.get('/contact/new', function(req, res) {
        res.render("contact/new", { locals: {
            title: 'New Contact'
        }
        });
    });

    app.get('/contact/edit',function(req,res){
        res.render("contact/new", { locals: {
            title: 'New Contact'
        }
        });
    });

    // EDIT
    app.get('/contact/:id/edit', function(req, res) {
            res.render('contact/edit',
                {
                    title: 'Edit contact',
                    contact: req.contact
                });
        });

    // SHOW
    app.get('/contact/:id',function(req,res){
        res.render('contact/show',{
            title: 'Show Contact',
            contact: req.contact
        })

    });


    // DELETE
    app.get('/contact/delete/:id', function(req, res){
        var contact = req.contact
        contact.remove(function(err){
            req.flash('notice', 'Deleted successfully')
            res.redirect('/contact')
        })
    })



    // READ
    app.get('/contact',  function(req, res){
        res.render('contact/index', {
            layout: true,
            title: 'Contacts'
         }
      )
    });

    app.get('/contact.json',function(req,res){
        Contact
            .find({})
            .desc('name')
            .run(function(error,contacts){
                if(error) throw error
                res.contentType('application/json');
                res.send(JSON.stringify(contacts));
            })

    });
}


