const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/Users');


const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, './client/dist')))

app.get('*', function(req, res){
res.sendFile(path.join(__dirname, './client/dist/index.html'));
});

mongoose.connect('mongodb+srv://beulahflary55:PsYeQ3JNTEGn4hB5@cluster0.vwd8igs.mongodb.net/multivendor');

app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(users => res.json(users))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});
