const Express = require('express');
const path = require('path')


const Util = require('./Util');
// const ServerError = require('.ServerError');


const App = Express();
const Port = 3000;


App.disable('etag');


App.get('/', (req,res) => {
				res.send("Live :)")
});

App.get('/export',(req,res) =>{
				var changeMe = "originial"
				Util.execute("touch thisfilewascreated.txt")
				.then(result => {
								changeMe = "Changed";
								res.sendFile(path.join(__dirname + '/data/pdf/test.pdf'));
				})
				.catch((result)=> {console.log("Something wrong")});
})

App.listen(Port, () =>{
				console.log(`App listening on port: ${Port}`)
});

