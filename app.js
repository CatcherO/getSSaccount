
var cheerio = require('cheerio');
var superagent = require('superagent');
var fs = require('fs');
var conf = require('./gui-config')


 superagent.get('https://my.ishadowx.net/')
    .end(function (err, sres) {
        if (err) {
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var config = [];
        $('.portfolio-items .portfolio-item .hover-text').each(function (idx, element) {
            var $element = $(element);
            const server = $element.find('h4:nth-child(1) span:nth-child(1)').text().trim();
            const server_port = $element.find('h4:nth-child(2) span:nth-child(1)').text().trim();
            const password = $element.find('h4:nth-child(3) span:nth-child(1)').text().trim();
            if(server && server_port && password) {
                config.push({
                    server,
                    server_port,
                    password,
                    method: "aes-256-cfb",
                    plugin: "",
                    plugin_opts: "",
                    plugin_args: "",
                    remarks: "",
                    timeout: 5
                });
            }
        });
        
        conf.configs = config
        fs.writeFile('gui-config.json',JSON.stringify(conf, null,' '), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('ok.');
            }
        });
      
    });
    



    