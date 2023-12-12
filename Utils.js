const ChildProcess = require('child_process');
/* 
  Possible changes? 
    -> Set up a var command that changes the pdf??
      - How will the pdf file be located statically? SHould it be stored as backup?

*/



/* 
XML Conversion, Calls Docker on system to execute the conversion of the newly uploaded file

Returns: String(filename with file extension)
 */
async function xml( filename, { log = true} = {}){
			var pdfFileName = filename.replace('xml','pdf')
			var ConvertDrawio = `docker run -t -w /data -v $(pwd)/data:/data woodmandrawio/v1 -x -f pdf -o /data/pdf/'${pdfFileName}' /data/xml/'${filename}'`
      console.log("Command: \n", ConvertDrawio)
      return new Promise((resolve, reject) =>{
        ChildProcess.exec(ConvertDrawio,{
            shell: 'bash',
        }, (err,stdout) => {
            if(err) return reject(err)
              return pdfFlieName
          });
      })
   }




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
   }






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

/* Server log function to keep track of possible ongoing issues */
async function Serverlog( logContext, { log = true} = {}){
      console.log(logContext);
      return new Promise((resolve, reject) =>{
        ChildProcess.exec(`echo "$(date +%F %T): ${logContext} >> /expressLogs/logs`,{
            shell: 'bash',
        }, (err,stdout) => {
            if(err) return reject(err)
              return resolve(String(stdout).trim());
          });
      })
   }

module.exports = {xml, Serverlog};