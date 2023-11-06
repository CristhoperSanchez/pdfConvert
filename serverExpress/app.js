const Express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path')

const Util = require('./Util');
// const ServerError = require('.ServerError');


const App = Express();
const Port = 3000;


App.use(Express.static('pages'));
App.disable('etag');
App.use(Express.urlencoded({extended: true}));
App.use(fileUpload());

App.use((req,res,next) =>{
	console.log("Request Processed: ", req.body);
	next()
});


App.get('/', (req,res) => {
				res.sendFile(__dirname + '/pages/main.html');
});

App.get('/export',(req,res) =>{
				var changeMe = "originial"
				.then(result => {
								changeMe = "Changed";
								res.sendfile(path.join(__dirname + "/data/pdf/test.pdf"));
				})
				.catch((err)=> {console.log(err)});
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
				filename = filename.replace('drawio','pdf')
				Util.execute()
					.then((result) =>{
								res.sendfile(path.join(__dirname + "/data/pdf/" + filename));
					}).catch((error) => {
									console.log(error);
					});


				// res.sendfile(path.join(__dirname + "/data/pdf/test.pdf"));
})
App.listen(Port, () =>{
				console.log(`App listening on port: ${Port}`)
});

