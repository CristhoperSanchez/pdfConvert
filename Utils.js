const ChildProcess = require('child_process');
const Drawio = 'docker run -it -w /data -v $(pwd):/data rlespianasse/drawio-desktop-headless -x -f pdf -o /data/pdf/ /data/drawio'

/* 
  Possible changes? 
    -> Set up a var command that changes the pdf??
      - How will the pdf file be located statically? SHould it be stored as backup?


*/
module.exports = class Terminal {

   static async exec(cmd, { log = true} = {}){
      return new Promise((resolve, reject) =>{
        ChildProcess.exec(Drawio, {
            shell: 'bash',
        }, (err,stdout) => {
            if(err) return reject(err)
              return resolve(String(stdout).trim());
          });
      })
   }
}
