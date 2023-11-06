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
				Util.execute()
				.then(result => {
								changeMe = "Changed";
								res.redirect('/')
				})
				.catch((err)=> {console.log(err)});
})

App.listen(Port, () =>{
				console.log(`App listening on port: ${Port}`)
});

