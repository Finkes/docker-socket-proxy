'use strict';

let express = require('express');
let request = require('request');
var bodyParser = require('body-parser')

let app = express();
let dockerSocket = 'http://unix:/var/run/docker.sock:';

app.use(bodyParser.json());

app.get('/*', (req, res) => {
    request.get(dockerSocket + req.url).pipe(res);    
});

app.post('/*', (req, res) => {
   console.log('post');
   request.post({
       url : dockerSocket + req.url,
       method: 'POST',
       json: true,
       body: req.body,
       headers: [
           {
               name: 'Content-Type',
               value: 'application/json'
           }
       ]
   }, (err, httpresponse, body) => {
       if(err){
        console.log(err);   
       }
   }).pipe(res);
});

app.listen(4000, () => {
    console.log('running on 4000');    
});