const childProcess = require('child_process');


const dCommand = 'docker run -t -w /data -v $(pwd)/data:/data rlespinasse/drawio-desktop-headless:local -x -f pdf -o /data/pdf /data/drawio'


async function execute(cmd){
	return new Promise((resolve, reject)=>{
					childProcess.exec('echo "Ran"' , {shell: 'bash'} , (err, stdout) => {
									if(err) return reject("Something didn't execute correctly");
									return resolve(String(stdout));
					})
				});
};

exports.execute = execute
