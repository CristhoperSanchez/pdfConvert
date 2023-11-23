require('dotenv').config()
const Express = require('express')
const fileUpload = require('express-fileupload');
const App = Express()
const Port = process.env.ENV == 'dev' ? 3000: process.env.PORT;
const path = require('path')
const Util = require('./Utils');

const ENV = process.env.ENV !='dev' ? null : true


console.log(process.env.ENV);
App.use(Express.static('pages'));
App.disable('etag');
App.use(Express.urlencoded({extended: true}));
App.use(fileUpload());










App.use((req,res,next) =>{
	
	next()
});

App.get('/', (req,res) => {
				res.sendFile(__dirname + '/pages/main.html');
});


App.post('/convert', (req,res) =>{
	var pdfstring = req.body["drawio-text"]
	if(pdfstring)
	{
	console.log(pdfstring)
	}else {
		console.log("No string")
		var text = {"hello.txt": "Hello Cruel world", "bye.txt": "Goodby world"};
		res.set({"Content-Disposition": "attachment; filename=hello.txt"});
		res.send(text["hello.txt"])
	}
	res.redirect('/')

})

App.post('/export',(req,res) =>{
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

		Util.exec(filename)
			.then((result) =>{
						res.sendfile(path.join(__dirname + "/data/pdf/" + Dfile));
			}).catch((error) => {
							console.log(error);
			});


		// res.sendfile(path.join(__dirname + "/data/pdf/test.pdf"));
})

App.get('/*', (req,res) =>{
				res.send("Invalid Path");
});


App.listen(Port, () =>{
				console.log(`App listening on port: ${Port}`)
});

