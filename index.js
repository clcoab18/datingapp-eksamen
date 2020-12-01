//Vaditation
router.get('/login', function(req, res) {
    res.render('login', { title:'login'});
}); 

router.post('/login', passport.authenticate('local', {
    sucessRedirect: '/profile',
    failureRedirect: '/login'
}));

router.get('/logout', function(req, res) {
    req.logout(); //logger ud automatisk 
    
    res.redirect('/');
});
