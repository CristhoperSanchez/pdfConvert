const ChildProcess = require('child_process');


/* 
  Possible changes? 
    -> Set up a var command that changes the pdf??
      - How will the pdf file be located statically? SHould it be stored as backup?


*/
async function exec( filename, { log = true} = {}){
			var Dname = filename.replace('drawio','pdf')
			var ConvertDrawio = `docker run -t -w /data -v $(pwd)/data:/data pdf_convert:local -x -f pdf -o /data/pdf/${Dname} /data/drawio/${filename}`
      return new Promise((resolve, reject) =>{
        ChildProcess.exec(ConvertDrawio,{
            shell: 'bash',
        }, (err,stdout) => {
            if(err) return reject(err)
              return resolve(String(stdout).trim());
          });
      })
   }

exports.exec = exec
