'use strict'
const ChildProcess = require('child_process');

/* 
  Possible changes? 
    -> Set up a var command that changes the pdf??
      - How will the pdf file be located statically? SHould it be stored as backup?
*/

function RequestHandler(fn){
  return function(req,res){
    Promise.resolve().then(async () => fn(req,res)).then( result => {
      if(res.headersSent) return;
      if(typeof result === 'undefined'){
        return res
          .status(204)
          .end();
      }
    })
  }
};
/* 
  XML Conversion, Calls Docker on system to execute the conversion of the newly uploaded file

  Returns: String(filename with file extension)
 */
async function xml( filename, { log = true} = {}){
			var pdfFileName = filename.replace('xml','pdf')
			var ConvertDrawio = `docker run -t -w /data -v $(pwd)/data:/data woodmandrawio/v1 -x -f pdf -o /data/pdf/'${pdfFileName}' /data/xml/'${filename}'`
      return new Promise((resolve, reject) =>{
        ChildProcess.exec(ConvertDrawio,{
            shell: 'bash',
        }, (err,stdout) => {
            if(err) return reject(err)

              return resolve("Success");
          });
      })
   }








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

module.exports = {xml, Serverlog, RequestHandler};