
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , now = require('now');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/gmap', routes.index);
app.get('/listenForOffer', routes.index);
app.get('/askHelp', routes.index);
app.get('/thankYouForOffer', routes.index);
app.get('/offerHelp', routes.index);
app.get('/channel', routes.channel);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

var usersIds = {};

// var helpRequests = [];

var everyone = now.initialize(server);
everyone.now.askForHelp = function (info) {
    console.log(usersIds[this.now.facebookID]);

    if (usersIds[this.now.facebookID] !== undefined) {
        var localName = this.now.name;
        var clientID = usersIds[this.now.facebookID];
        console.log(clientID);
        console.log('User ' + localName + ' has already asked for help');

        // user = now.getClient(clientID, function () {
        //     this.now.feedback({
        //         name: localName,
        //         message: 'You are already waiting for help!'
        //     });
        // });
        return;
    }

    console.log(this.now.facebookID);
    console.log(this.user.clientId);
    console.log(info.message);
    console.log(info.lat);
    console.log(info.lng);

    usersIds[this.now.facebookID] = this.user.clientId;

    // everyone.now.show('Server says: ' + message);
    var newGroup = now.getGroup('asd');
    this.user.facebookID = this.now.facebookID;
    this.user.message = info.message;
    this.user.name = this.now.name;
    this.user.lat = info.lat;
    this.user.lng = info.lng;
    newGroup.addUser(this.user.clientId);

    // this.now.feedback(message);

    everyone.now.feedback({
        id: this.now.facebookID,
        name: this.now.name,
        clientId: this.user.clientId,
        message: info.message,
        lat: info.lat,
        lng: info.lng
    });

    // helpRequests.push({
    //     id: this.now.facebookID,
    //     name: this.now.name,
    //     clientId: this.user.clientId,
    //     message: message
    // });

    // user = now.getClient(usersIds[facebookID], function () {
    //     console.log(this.now);

    //     this.now.receiveMessage('Yay! Someone is gonna help you!');
    // });
};

everyone.now.giveHelp = function(facebookID) {
    console.log(facebookID);
    console.log(usersIds[facebookID]);
    user = now.getClient(usersIds[facebookID], function () {
        console.log(this.now);

        this.now.receiveMessage('Yay! Someone is gonna help you!');
    });
};

everyone.now.offerHelp = function (facebookID, helperId, helperName) {
    // cancello il marker e metto in comunicazione i due
    user = now.getClient(usersIds[facebookID], function () {
        console.log(this.now);

        this.now.receiveMessage({
            name: helperName,
            helperId: helperId,
            helperName: helperName
        });

        everyone.now.helpFound({
            id: facebookID,
            name: helperName,
            helperId: helperId
        });
    });
};
