const childProcess = require('child_process');


const dCommand = 'docker run -t -w /data -v $(pwd)/data:/data rlespinasse/drawio-desktop-headless -x -f pdf -o /data/pdf /data/drawio'

async function execute(cmd){
	return new Promise((resolve, reject)=>{
					childProcess.exec(`${dCommand}`, {shell: 'bash'} , (err, stdout) => {
									if(err) return reject(err);
									return resolve(String(stdout));
					})
				});
};

exports.execute = execute

/*
	DEAR MORNING CRIS,
		this sucked and took forever, the master computer needs to have sudo snap drawio installed. and the docker package called for is the :latest
			when calling the execution command you need ot make sure that the option isn't interactive terminal but just termial
			specified by the -t flag. then it will work..
				Yes This was a horrible experience

*/