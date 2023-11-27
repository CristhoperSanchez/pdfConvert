const ChildProcess = require('child_process');
const base64ToImage = require('base64-to-image');


/* 
  Possible changes? 
    -> Set up a var command that changes the pdf??
      - How will the pdf file be located statically? SHould it be stored as backup?

*/






function base64(base64string,name){
  console.log(name)
  var objectProperties = {"fileName": name, 'type':'png'};
  base64ToImage( base64string, './data/png/', objectProperties)

  

};


async function exec( filename, { log = true} = {}){
			var Dname = filename.replace('drawio','pdf')
			var ConvertDrawio = `docker run -t -w /data -v $(pwd)/data:/data pdf_convert:local -x -f pdf -o /data/pdf/'${Dname}' /data/drawio/'${filename}'`
				console.log("Command: \n", ConvertDrawio)
      return new Promise((resolve, reject) =>{

        ChildProcess.exec(ConvertDrawio,{
            shell: 'bash',
        }, (err,stdout) => {
            if(err) return reject(err)
              return resolve(String(stdout).trim());
          });
      })
   }

module.exports = { base64, exec };