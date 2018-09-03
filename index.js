var request = require('request');
var fs = require('fs');
var _ = require('underscore');
require('dotenv').config();

var cookieJar = request.jar();
var recordings = [];
var index = 1;

function getRecordings(index, callback) {
    request.get({
        url: 'https://apps.calliflower.com/recording/fetch_all?index=' + index,
        json: true,
        jar: cookieJar
    }, function(error, response, data) {
        if ( data.length > 0 ) {
            _.each(data, function(item) {
                recordings.push(item);
            });
            index++;
            getRecordings(index, callback);
        } else {
            callback();
            downloadRecordings();
        }
    }
    )};

function downloadRecordings () {
    console.log('We have ' + recordings.length + ' recordings to process');
    if (!fs.existsSync(process.env.DIRECTORY)){
        fs.mkdirSync(process.env.DIRECTORY);
    }
    _.each(recordings, function (item) {
        request
            .get(item.download_link, function() {
                //Extra processing...
                console.log('Processing: ' + item.id + ' (Size: ' + item.size + ')');
            })
            .on('error', function(err) {
                console.log(err)
            })
            .pipe(fs.createWriteStream(process.env.DIRECTORY + '/' + item.id + '.mp3'))
    })
}

request.post({
    url: 'https://apps.calliflower.com/login/login_page',
    form: {"username": process.env.USERNAME, "password": process.env.PASSWORD, "remember_me": "1"},
    jar: cookieJar
}, function(error, response, body){
    getRecordings(index, function () {
        console.log('Complete list of recordings retreived');
    });
});
