require('dotenv').config()
const Express = require('express')
const fileUpload = require('express-fileupload');
const App = Express()
const Port = process.env.ENV == 'dev' ? 3000: process.env.PORT;
const path = require('path')
const {xml, Serverlog} = require('./Utils');
const fs = require('fs');

const [
	PORT,
	APIKEY,
	ENV,
] = [
	process.env.PORT,
	process.env.APIKEY,
	process.env.ENV,
]

// console.log("Enviroment Variables: ", PORT, APIKEY, ENV)

App.use(Express.static('pages'));
App.disable('etag');
App.disable('x-powered-by');
App.use(Express.urlencoded({extended: true}));
App.use(fileUpload());



// MiddleWear Funciton for Logging
App.use((req,res,next) =>{
	if(!req.body || (req.body["APIKEY"] != APIKEY )){
		res.status(401)
		res.send({
			status: 400,
			error: "Invalid Request"
			});	
			console.log("Invalid Request Detected")
		return;
	}else{
		next()
	}
	return
});


App.get('/', (req,res) => {
	res.sendFile(__dirname + '/pages/main.html');
});

App.post('/convert', async (req,res) =>{
	var XML = req.body["XML"]
	if(!XML){
		res.send("No XML detected;");
		return;
	}
	console.clear()
	fs.writeFileSync(path.join(__dirname + "/data/xml/" + "drawio.xml"), XML, {encoding: "utf-8"})
	xml("drawio.xml").then(
		(result)=>{
		console.log("Conversion done")
		res.sendFile(path.join(__dirname + '/data/pdf/'  + "drawio.pdf"));
		}
	).catch((error)=> Serverlog("PDF Conversion Error: ", error));
})


/* App.post('/export',(req,res) =>{
		let file;
		if(!req.files){
						console.log("No files were uploaded");
						return res.status(400).send("No files were uploaded")
		};
		console.log(req.files);
		file = req.files.drawio
		let uploadPath = __dirname + '/data/drawio/' + file.name
		file.mv(uploadPath, function(err){
					if(err)return res.status(500).send(err);
		});

		var filename = file.name
		var Dfile = filename.replace('drawio','pdf')
		console.log("FileName: ", filename, " Conversion Value: ", Dfile);
		exec(filename)
			.then((result) =>{
						res.sendfile(path.join(__dirname + "/data/pdf/" + Dfile));
			}).catch((error) => {
							console.log(error);
			});
		// res.sendfile(path.join(__dirname + "/data/pdf/test.pdf"));
}) */




App.get('/*', (req,res) =>{
		res.send({
			status: 400,
			error: "Invalid Request"
		})
});


var server = App.listen(3000)
server.keepAliveTimeout = 90*1000;
server.headersTimeoutTimeout = 90*1000;

