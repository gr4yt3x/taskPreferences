const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));



var tasks = [];

var tasksPreference = [];


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/main.html');
})


app.post('/tasks/create', (req,res) => {
    if(req.body.preference != 0){
        let task = req.body.task;
        let preference = req.body.preference;
        tasks.push({... req.body});
        res.redirect('/')
    }
    else{res.send("not valid")}
})

app.get('/tasks', (req,res) => {
    res.send(tasks);
})


app.get('/tasks/:id', (req,res) => {
    let id = req.params.id;
    if(id == "preference"){
        tasksPreference.push(tasks.filter((task) => task.preference == "Must_do"));
        tasksPreference.push(tasks.filter((task) => task.preference == "Should_do"));
        tasksPreference.push(tasks.filter((task) => task.preference == "Could_do"));
        res.send(tasksPreference);
    }
    else if(id == "must"){
        let must = [];
        must = tasks.filter((task) => task.preference == "Must_do");
        res.send(must);
    }
    else if(id == "should"){
        let should = [];
        should = tasks.filter((task) => task.preference == "Should_do");
        res.send(should);
    }
    else if(id == "could"){
        let could = [];
        could = tasks.filter((task) => task.preference == "Could_do");
        res.send(could);
    }
    else{
        res.send("preference not found");
    }
})




app.use((req,res) => {
    res.status(404).send("not found");
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something Wrong!');
  });
  



app.listen('3000' , () => console.log("escutando na porta 3000..."));
