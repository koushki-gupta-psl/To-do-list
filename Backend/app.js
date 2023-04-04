const express=require('express');
const app=express();
const mongoose=require('./database/mongoose');
const List=require('./database/Models/list');
const Task=require('./database/Models/task');
var cors = require('cors');


app.use(express.json());
app.use(cors()) ;

// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Methods","GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
//     res.header("Access-Control-Allow-Headers","Origin<X-Requested-With,Content-Type,Accept");
//     next();
// });

app.post('/lists',(req,res)=>{
    (new List({'title':req.body.title}))
        .save()
        .then((list)=>res.send(list))
        .catch((error)=>console.log(error))
});


app.get('/lists',(req,res) =>{
    List.find({})
        .then(lists=>res.send(lists))
        .catch((error)=>console.log(error));

});

app.get('/lists/:listid',(req,res)=>{
    List.find({_id:req.params.listid})
        .then(lists=>res.send(lists))
        .catch((error)=>console.log(error));
})

app.patch('/lists/:listid',(req,res)=>{
    List.findOneAndUpdate({'_id':req.params.listid},{$set:req.body})
        .then(lists=>res.send(lists))
        .catch((error)=>console.log(error));
})

app.delete('/lists/:listid',(req,res)=>{
    const deleteTasks=(lists)=>{
        Task.deleteMany({_listid:lists._id})
            .then(()=>list)
            .catch((error)=>console.log)
    }


    const list=List.findByIdAndDelete(req.params.listid)
        .then((lists)=>deleteTasks(lists))
        .catch((error)=>console.log(error))
        res.send(list)

})

app.get('/lists/:listid/tasks',(req,res)=>{
    Task.find({_listid:req.params.listid})
    .then((tasks)=>res.send(tasks))
    .catch((error)=>console.log(error));


});

app.post('/lists/:listid/tasks',(req,res)=>{
    (new Task({'title':req.body.title,'_listid':req.params.listid,'completed':req.body.completed}))
        .save()
        .then((task)=>res.send(task))
        .catch((error)=>console.log(error))
});

app.get('/lists/:listid/tasks/:taskid',(req,res)=>{
    Task.findOne({_listid:req.params.listid,_id:req.params.taskid})
    .then((tasks)=>res.send(tasks))
    .catch((error)=>console.log(error));


});

app.patch('/lists/:listid/tasks/:taskid',(req,res)=>{
    Task.findOneAndUpdate({_listid:req.params.listid,_id:req.params.taskid},{$set:req.body})
    .then((tasks)=>res.send(tasks))
    .catch((error)=>console.log(error));
    


});

app.delete('/lists/:listid/tasks/:taskid',(req,res)=>{
    Task.findOneAndDelete({_listid:req.params.listid,_id:req.params.taskid})
    .then((tasks)=>res.send(tasks))
    .catch((error)=>console.log(error));


});


app.listen(3000,() => console.log('Server listening on port 3000'));
