/**
 * Company: OfficeSoft
 * Date: 11/05/12
 * Time: 19:29
 */

var Winston = require('winston');
var Logger = require('winston').Logger;
require('winston-syslog').Syslog;

LogProvider = function(){
    this.Logger = new (this.Winston.Logger)({
       transports: [new (Winston.transports.Syslog)({
           host : '192.168.0.150',
           protocol: 'tcp4',
           app_id: 'NodeErp',
           port: 514
       }),
        new (Winston.transports.Console)()
       ]
    });
}

LogProvider.prototype.Log = function(level,msg){
    logger.log(level,msg);
}





