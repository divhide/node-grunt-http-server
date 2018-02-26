"use strict";

var _ = require("lodash"),
    fs = require('fs'),
    path = require('path'),
    showdown  = require('showdown'),
    Divhide = require("divhide");

/**
 *
 * Creates a customPages middleware which serve the a custom url with
 * the content of the given file.
 *
 * @param {String} basePath
 * @param {Object} rules
 *
 */
var CustomPagesMiddleware = function(basePath, rules){
    basePath = Divhide.Safe.string(basePath);
    rules = Divhide.Safe.object(rules);

    // workaround for https://github.com/divhide/node-divhide/issues/39
    var RegExpFormat = /^\/.*\/([gimuy]*)$/;
    var isRegExpStr = function (value){
        if(!Divhide.Type.isString(value)){
            return false;
        }

        return !!RegExpFormat.exec(value);
    };

    var reducer = function(acc, regExpStr){
        var re = Divhide.Safe.regexp(regExpStr);
        var match = Divhide.Safe.string(rules[regExpStr]);
        acc.push([re, match]);
        return acc;
    };
    var regexpRules = Object.keys(rules)
        .filter(isRegExpStr)
        .reduce(reducer, []);

    return function(req, res){
        var url = req.url;
        var relFilePath = Divhide.Safe.string(rules[url]);

        // check for possible string regexp
        if(!relFilePath){
            for(var i = 0, l = regexpRules.length; i < l; i++){
                if(regexpRules[i][0].test(url)){
                    relFilePath = regexpRules[i][1];
                    break;
                }
            }
        }

        // ignore if no rule is defined
        if(!relFilePath){
            res.emit("next");
            return;
        }

        var filePath = path.normalize(basePath + "/" + relFilePath);
        fs.readFile(filePath, "utf8", function(err, data){

            var fileContent = data;
            if (err){
                fileContent = err.toString();
            }

            // convert markdown files
            if(path.extname(filePath) == ".md"){
                fileContent = new showdown.Converter().makeHtml(fileContent);
            }

            res.setHeader('Content-Type', 'text/html');
            res.end(fileContent);

        });
    }

};

module.exports = CustomPagesMiddleware;