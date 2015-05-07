var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
 
var config = {
    username: "4ltr4r1v13r4",
    password: "Ha2Thi)a-hewi1eP[_Sha>f8Ei_Aes[e7ai", // optional, prompted if none given 
    host: "81.23.86.216",
    port: 21,
    localRoot: __dirname + "/site",
    remoteRoot: "/",
    exclude: ['.git', '.idea', 'tmp/*']
}
    
ftpDeploy.on('uploading', function(data) {
    /*
    data.totalFileCount;       // total file count being transferred
    data.transferredFileCount; // number of files transferred
    data.percentComplete;      // percent as a number 1 - 100
    data.filename;             // partial path with filename being uploaded
    */
    console.log(data) ;
});

ftpDeploy.on('uploaded', function(data) {
    console.log(data);         // same data as uploading event
});

ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('finished');
});