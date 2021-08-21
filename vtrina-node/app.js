const { response } = require('express');
const express = require('express');
const app = express();
const porta = 8888;
const apiRequest = require ('./api/v1/service');

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/views/index.html');
});

app.get('/api/:action/:cep',function(req,res){
    res.status(200).json(apiRequest.searchCep(req.body.action,req.body.cep));
});

app.post('/api',function(req,res){
    const fetchData = apiRequest.searchCep(req.body.action,req.body.cep);
    fetchData.then((response)=>{
        res.status(200).json(response);
    }).catch(()=>{
        res.status(200).json({
            "resul":"error",
            "message":"Ocorreu um erro ao realizar a consulta!"
        });
    })
});

app.use(function(req,res){
    res.status(404).sendFile(__dirname+"/views/404.html");
});

app.listen(porta,function(){
    console.log(`Servidor Iniciado : http://127.0.0.1:8888
    `);
});