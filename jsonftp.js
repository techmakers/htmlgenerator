/**
 * Created by cashbit on 24/04/15.
 */


var Client = require('ssh2').Client;

var conn = new Client();
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
