const Express = require('express')
const App = Express()
const path = require('path')
const Port = 1738
const Terminal = require('./Utils')


App.use('/drawio', Express.static(path.join(__dirname, 'data/drawio')))
App.use('/pdf', Express.static(path.join(__dirname, 'data/pdf')))


App.route('/')
   .get((req,res) =>{
      Terminal.Terminal()
					 .then((result)=>{
									 console.log("Success: ", result)})
					 .catch((error) => {
									 console.log("Error: ", error)});
      res.send("Hello")
   })
   .post((req,res) => {
      res.redirect('/')
   });





App.listen(Port, ()=>{
   console.log(`App listening on port: ${Port}`)
})

