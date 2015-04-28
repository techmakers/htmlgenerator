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



/*int sftp_jsonapp(ssh_session session, sftp_session sftp)
{
    int rc;
    rc = sftp_mkdir(sftp, "jsonapp", S_IRWXU);
    if (rc != SSH_OK)
    {
        if (sftp_get_error(sftp) != SSH_FX_FILE_ALREADY_EXISTS)
        {
            fprintf(stderr, "Can't create directory: %s\n",
                ssh_get_error(session));
            return rc;
        }
    };

    return SSH_OK;
}
*/
conn.sftp("webgaljeson",function(error,sftp,upload){
file = sftp.open(sftp, __dirname +"/html", "access_type", "S_IRWXU");
if (file == NULL)
{
    fprintf(stderr, "Can't open file for writing: %s\n",
        ssh.get.error(session));
    return SSH_ERROR;
}
nwritten = sftp.write(file,webgaljson, length);
if (nwritten != length)
{
    fprintf(stderr, "Can't write data to file: %s\n",
        ssh.get.error(session));
    sftp.close(file);
    return SSH_ERROR;
}
rc = sftp_close(file);
if (rc != SSH_OK)
{
    fprintf(stderr, "Can't close the written file: %s\n",
        ssh.get.error(session));
    return rc;
}
return SSH_OK;
});


