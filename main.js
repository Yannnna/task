//server.js

// set up
var express  = require('express');
var app      = express(); 
var https = require('https');
var path = require('path');
app.use(express.static(__dirname));


// api ------------------- 
 app.get('/api/currentStatus', function(req, res) {
    
	https.get('https://status.github.com/api/status.json', (gidHubRes) => {
		console.log('statusCode: ', gidHubRes.statusCode);
		console.log('headers: ', gidHubRes.headers);

		gidHubRes.on('data', (d) => {
			process.stdout.write(d);
			var obj = JSON.parse(d);
			console.log("\n current status: "+obj.status);
			res.json(obj);
			});
		}).on('error', (e) => {
			console.error(e);
	});
});
	
app.get('/api/availability', function(req, res) {
	
	https.get('https://status.github.com/api/messages.json', (gidHubRes) => {
		//console.log('statusCode: ', gidHubRes.statusCode);
		//console.log('headers: ', gidHubRes.headers);

		gidHubRes.on('data', (d) => {
			//process.stdout.write(d);
			var obj = JSON.parse(d);
			//console.log("\n obj.length: "+obj.length);
			
			console.log("\n Availability: ");
			for(var i=0; i<obj.length;i++){
				//console.log("\n"+obj[i].created_on+": "+obj[i].status+": "+obj[i].body); 
				//console.log("\n typeof(obj[i].created_on): "+typeof(obj[i].created_on));
				var created_on=obj[i].created_on;
				//console.log("\n typeof(created_on): "+typeof(created_on));
				if((created_on!=null) && !(""==created_on)){
					//console.log("\n valid!");
					var dateArr=created_on.split("T");
					obj[i].date=dateArr[0];
					obj[i].time=dateArr[1].substr(0,dateArr[1].length-1);
				}
				delete obj[i].created_on;
			}
			res.json(obj);
			
		  });
		}).on('error', (e) => {
		  console.error(e);
	});
});
//------------------ 


// application -------------------------------------------------------------
    app.get('/GidHubStatus', function(req, res) {
        res.sendFile(path.join(__dirname,'index.html')); 
		
    });

// listen (start app with node main.js)
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});