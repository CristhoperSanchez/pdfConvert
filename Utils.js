const ChildProcess = require('child_process');
const base64ToImage = require('base64-to-image');
const Data = './data/'


/* 
  Possible changes? 
    -> Set up a var command that changes the pdf??
      - How will the pdf file be located statically? SHould it be stored as backup?

*/




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
   }





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


async function exec( filename, { log = true} = {}){
			var Dname = filename.replace('drawio','pdf')
			var ConvertDrawio = `docker run -t -w /data -v $(pwd)/data:/data woodmandrawio/v1 -x -f pdf -o /data/pdf/'${Dname}' /data/drawio/'${filename}'`
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

module.exports = { base64, exec, png };