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

//Stay loggedin 
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3700;
//Var til payload med token
let sessionID; 

class User {
    constructor(username, password, desc) {
        this.username = username;
        this.password = password;
        this.desc = desc;
    }
}

//User-array - mimering af liste med brugere i JSON-format
let userArr = [{"username": "JennieJane", "password": "Blackpink1234"}];
//Privatekey til token 
const privateKey = 'This key is private :)';


//Validation funktion
function isAuth(req, res, next) {
    console.log(req)
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization;

        //Token validation
        jwt.verify(token, privateKey, {algorithm: "HS256"}, (err, decoded) => {
            //If an error occurred
            if (err) {
                res.status(500);
                throw new Error("Token is not accepted or an error occurred");
            }
            sessionID = decoded;
            console.log(decoded)
            return next();
        });
    } else {
        //If an error occurred
        res.status(500);
        console.log(req.headers.authorization);
        throw new Error("Something went wrong with authentification");
    };
};


app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    console.log('User and pass from req: '+ username +' ' + password); 

    let userInArr = false;
    let userInArrIndex = 0;

    for (let i = 0; i<userArr.length; i++) {
        if (username == userArr[i].username) {
            if (password == userArr[i].password) {
                userInArr = true;
                userInArrIndex = i;
                console.log('Index on userarray '+userInArrIndex);
                break;
            } else {
                console.log('False, Wrong password')
            }
            
        }
    }

    if (userInArr) {
        let token = jwt.sign({usernameSession: username},privateKey,{algorithm: 'HS256'});
        console.log(token);
        res.send(JSON.stringify(token));
    }
})

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