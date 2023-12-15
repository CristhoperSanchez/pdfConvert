
/*   
PDF String Converter
Failed: Would not load more than one image from the file.
async function base64(base64string,name){
  if(!base64string) return { error: "No string Detected"}
  return new Promise((resolve,reject ) =>{
    try {
      var objectProperties = {"fileName": name, 'type':'png'};
      base64ToImage( base64string, './data/png/', objectProperties)
      resolve (`/data/png/${name}.png`)
    }
    catch (error) {
        reject("error") 
    }
  })

};

 */

/*
---------PNG HANDLER 
async function png( filename, { log = true} = {}){
			var drawioFileName = filename.replace('drawio','pdf')
			var ConvertDrawio = `docker run -t -w /data -v $(pwd)/data:/data woodmandrawio/v1 -x -f png -o /data/png/'${filename}' /data/drawio/'${filename}'`
      console.log("Command: \n", ConvertDrawio)
      return new Promise((resolve, reject) =>{
        ChildProcess.exec(ConvertDrawio,{
            shell: 'bash',
        }, (err,stdout) => {
            if(err) return reject(err)
              return resolve(String(stdout).trim());
          });
      })
   } */



/* 
---------PDF HANDLER 
async function pdf( filename, { log = true} = {}){
			var ConvertDrawio = `docker run -t -w /data -v $(pwd)/data:/data woodmandrawio/v1 -x -f pdf -o /data/pdf/'${filename}.pdf' /data/xml/'${filename}.xml'`
      return new Promise((resolve, reject) =>{
        ChildProcess.exec(ConvertDrawio,{
            shell: 'bash',
        }, (err,stdout) => {
            if(err) return reject(err)
              return resolve(String(stdout).trim());
          });
      })
   } */

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