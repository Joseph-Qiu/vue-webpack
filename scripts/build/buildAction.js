var fs = require('fs');
	
var buildAction = function(param) {
	param = param || {};
	if(!param.file || !param.out) {
		console.log('path error');
		return;
	}
	var file = fs.createReadStream(param.file);
	var out = fs.createWriteStream(param.out);
	
	file.on('data', function(data) {
		if(param.replaceArr) {
			for(var i in param.replaceArr) {
				var reg = new RegExp('{' + param.replaceArr[i].reg + '}', 'g');
				data = data.toString().replace(reg, param.replaceArr[i].value);
			}
		}
		out.write(data);
	});
	
	out.on('open',function(fd){
		//console.log('opening');
	});

	file.on('end',function(){
		out.end('',function(){
			//console.log('write finish');
			console.log('total' + out.bytesWritten + 'byte');
		});
	});
}

exports.buildAction = buildAction;


