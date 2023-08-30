import express from 'express';
import "reflect-metadata";
import userRouter from './routers/user.js';
import db from './db/index.js'

const app = express();
const port = 3000;
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Server is Working!");
});

app.use('/user', userRouter);

app.use((req, res) => {
    res.status(404).send("Page does not exist :(");
});

app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);  
    db.initialize();
})






























/*app.get('/students', (req, res) => {
    res.send(data);
});

app.post('/students', (req, res) => {
    const newStudent = req.body;
    data.unshift(newStudent);
    res.send("New student added!");
});

app.put('/students/:id', (req, res) => {
    const stid = parseInt(req.params.id);
    for(let i = 0; i < data.length; i++){
        if(data[i].id === stid) 
            data[i] = {...data[i], ...req.body};
        res.send("Success!!");
        return;
    }
    res.send("Failed.")
});

app.delete('/students', (req, res) => {
    if(!req.query?.id){
        res.send("Error: send params");
        return;
    } else{
        const stdId = parseInt(req.query.id.toString());
        let found = data.findIndex((std) => std.id === stdId);
        if(found >0){
            data.splice(found, 3);
            res.send("Success Delete");
            return;
        }else {
            res.send("Error: Student not found!");
        }

    }
    
});



app.get('/hello', (req, res) => {
    res.send("<div><h1>Hello, World!</h1></div>");
})*/