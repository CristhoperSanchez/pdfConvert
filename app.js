const Express = require('express')
const App = Express()
const Port = 1738
const Terminal = require('./Utils')






App.route('/')
   .get((req,res) =>{
      Terminal.exec()
      res.send("Hello")
   })
   .post((req,res) => {
      res.redirect('/')
   });





App.listen(Port, ()=>{
   console.log(`App listening on port: ${Port}`)
})

