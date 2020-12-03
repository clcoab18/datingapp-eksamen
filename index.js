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
    res.session.destroy(); 
    res.redirect('/');
});

// Users
[{"username":"Jennie","likes":[],"dislikes":["Felix","IN"]},{"username":"Felix","likes":[],"dislikes":["IN"]},{"username":"RM","likes":[],"dislikes":["Dean","IN"]},{"username":"Dean","likes":[],"dislikes":["Felix","IN","Karsten","Jennie"]}]

//Like eller dislike 
const matchmaking = JSON.parse(file);
console.log('show underlist length: '+matchmaking.length);

function RandomUser() {
    return Math.floor(Math.random() * matchmaking.length)
}

function findUserAtIndex(user) {
    for (let i = 0; i<matchmaking.length; i++) {
        if (user == matchmaking [i].username) {
            return i;
        }
    }
}

function findUser(thisUser) {
    let thisUserIndex = findUserAtIndex(thisUser);
    let arr =[];
    if (matchmaking [thisUserIndex].dislikes.length < matchmaking.length-1) {
        this.findUserHelper(thisUser, thisUserIndex, arr)
    } else {
        return null
    }
    return arr [0];
}

function findUserHelper(thisUser, thisUserIndex, arr) {
    let index = RandomUserIndex();
    let maybeUser = matchmaking [index].username; 

    //Base
    if(thisUser != maybeUser) {
        for (let i=0; i<matchmaking[thisUserIndex].dislikes.length; i++) {
            if (maybeUser == matchmaking[thisUserIndex].dislikes[i]) {
                this.findUserHelper(thisUser, thisUserIndex, arr);
            }
        }
        return arr.push(maybeUser);
    } else {
        this.findUserHelper(thisUser, thisUserIndex, arr)
    }
}

console.log(findUser('Lee'))
console.log(matchmaking[0].dislikes[0])

