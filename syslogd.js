
// <5>21 Jun 19:19:38 mt-nme-cosnme2.nuance.com MMFBanking|IP=10.3.28.140|customerName=Nuance|applicationName=MMFBanking|version=1.0000|callerID=DB683245-D8BA-4453-8136-831325EDC6E3|OSName=iPhoneOS|OSVersion=4.2.1|modelName=iPodtouch|hardware=4G|Resolution=640.00x960.00 from 10.3.39.106:50231
var dgram = require('dgram'),
    syslog_re = /<([^>]+)>([A-Z][a-z]+\s+\d+\s\d+:\d+:\d+) ([^\s]+) (.*)/i,
    server, serverPort = 5140,
    util = require('util');


server = dgram.createSocket('udp4');
server.on('message', function(msg, rinfo) {
    //util.log('server got: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
    var logline = syslog_re.exec(msg);
    var loginfo = {
        client_ip: rinfo.address,
        pri: logline[1],
        timestamp: logline[2], // new Date(logline[2]),
        hostname: logline[3],
        message: logline[4]
    };
    //util.log('server got: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port + '|' + util.inspect(loginfo));
    //util.log(util.inspect(loginfo));
    util.log(msg);

});

server.on('listening', function() {
    var address = server.address();
    util.log('server is listening on ' + address.address + ':' + address.port);
});

server.bind(serverPort);
