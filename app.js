
var cheerio = require('cheerio');
var superagent = require('superagent');
var fs = require('fs');
var confs = [];

const random = length => {
    return Math.floor(length*Math.random())
 }
 superagent.get('https://my.ishadowx.net/')
    .end(function (err, sres) {
        if (err) {
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        $('.portfolio-items .portfolio-item .hover-text').each(function (idx, element) {
            var $element = $(element);
            const server = $element.find('h4:nth-child(1) span:nth-child(1)').text().trim();
            const server_port = $element.find('h4:nth-child(2) span:nth-child(1)').text().trim();
            const password = $element.find('h4:nth-child(3) span:nth-child(1)').text().trim();
            if(server && server_port && password) {
                confs.push({
                    server,
                    server_port,
                    local_address: "127.0.0.1",
                    local_port: 1080,
                    password,
                    timeout: 300,
                    method: "aes-256-cfb",
                    fast_open: false
                });
            }
        });
        
        
        fs.writeFile('conf.json',JSON.stringify(confs[random(confs.length)], null,' '), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('ok.');
            }
        });
      
    });
    
    

    