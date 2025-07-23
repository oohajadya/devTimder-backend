const express = require('express');

const app = express();

//exploring the REST APIS
app.get('/user',(req,res) => {
   res.send('get request')
})

app.post('/user',(req,res) => {
   res.send('saved request')
})

app.put('/user',(req,res) => {
   res.send('updated request')
})

app.delete('/user',(req,res) => {
   res.send('delte request')
})



app.listen(3000,() => {
    console.log('app is running in the port 3000')
})