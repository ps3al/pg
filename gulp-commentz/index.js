'use strict';
const PLUGIN_NAME = 'gulp-commentz';
var through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError;

var gulpCommentz = function() {
    return through.obj(function (file, enc, callback) {
        var isBuffer = false,
            inputString = null,
            result = null,
            outBuffer=null;
        if (file === null || file.isDirectory()) {
            this.push(file);
            return callback();
        }
        isBuffer = file.isBuffer();
        if(isBuffer){
            inputString = new String(file.contents);
            result = myFunction(inputString);
            outBuffer = new Buffer(result);
            var aFile = new gutil.File();
            aFile.path = file.path;
            aFile.contents = outBuffer;
            callback(null,aFile);
        }else{
            this.emit('error',
                new PluginError(PLUGIN_NAME,
                'Only Buffer format is supported'));
            callback();
        }
    });
};


var myFunction = function(stringz) {
    var x = stringz.$1elements(new RegExp("section[^>]*id=[\"\'](.*?)[\"\']", "g"));
    
    if(x !== null){ 

        for (var i = 0; i < x.length; i++) {
    //        stringz = test(stringz,"<section",'<!-- START '+ capitalize(((x[i].replace("_"," ")).replace("-"," ")).replace("."," ")) + ' -->\n<section',i+1);
    //        stringz = test(stringz,"</section>",'</section>\n<!-- END '+ capitalize(((x[i].replace("_"," ")).replace("-"," ")).replace("."," ")) + ' -->',i+1);
            stringz = test(stringz,"<section",'<!-- START '+ capitalize( (((x[i].split("-").join(" ")).split("_").join(" ")).split(".").join(" ")) ) + ' -->\n<section',i+1);
            stringz = test(stringz,"</section>",'</section>\n<!-- END '+ capitalize( (((x[i].split("-").join(" ")).split("_").join(" ")).split(".").join(" ")) ) + ' -->',i+1);
        }

    }
	return stringz;
}

String.prototype.$1elements=function(vregex) {
    var elm=[]; var str=this; if ((vregex=="")||(this=="")) return null;
    var re= new RegExp(vregex, "");
    var vmm = re.exec(str);
    if ((vmm==null)||(vmm.length<2)) return null;
    do { var vmm = re.exec(str);

        var lstin = (vmm!=null) ? str.indexOf(vmm[0])+vmm[0].length : 0;
        str = str.substring(lstin,str.length);
        if (vmm!=null) elm.push(vmm[1]);
    } while(vmm!=null);
    return elm;
}

function test(str, sSearch, sReplace, n) {
	for (var times = 0, index = 0; times < n && index != -1; times++) {
		index = str.indexOf(sSearch, index + 1);
	}
	return str.substr(0, index) + sReplace + str.substr(sSearch.length + index);
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = gulpCommentz;
