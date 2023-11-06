const ChildProcess = require('child_process');
const Drawio = 'docker run -it -w /data -v $(pwd)/data:/data rlespianasse/drawio-desktop-headless:local -x -f pdf -o /data/pdf /data/drawio'

/* 
  Possible changes? 
    -> Set up a var command that changes the pdf??
      - How will the pdf file be located statically? SHould it be stored as backup?


*/
async function exec(cmd, { log = true} = {}){
      return new Promise((resolve, reject) =>{
        ChildProcess.exec(`${Drawio}`, {
            shell: 'bash',
        }, (err,stdout) => {
            if(err) return reject(err)
              return resolve(String(stdout).trim());
          });
      })
   }

exports.Terminal = exec
