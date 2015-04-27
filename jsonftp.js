/**
 * Created by cashbit on 24/04/15.
 */

var Client = require('ssh2').Client;
//var node-sftp = require ('node-sftp');
var conn = new Client()
conn.on('ready', function() {
    console.log('Client :: ready');
    conn.sftp(function(err, sftp) {
        if (err) throw err;
        sftp.readdir('webgaljson', function(err, list) {
            if (err) throw err;
            console.dir(list);
            conn.end();
        });
    });
}).connect({
    host: 'celewebdev.co.uk',
    port: 22456,
    username: 'frogpress_md',
    password: 'bikini69'
});

var nwritten = "1";
if (nwritten != 0){
    testprint()
}
function testprint(){

    console.log("nwritten diverso da 0");
}


var folder = "3";
if (folder ===0) {
    console.log("folder vuoto")
}else{
    folderprint()
}
 function folderprint(){
     console.log("folder ok");
 }