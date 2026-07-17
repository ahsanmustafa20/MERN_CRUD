const expresss = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');


const app = expresss();
app.use(cors());

app.use(expresss.json());

mongoose.connect("mongodb://127.0.0.1:27017/CRUD")

app.get("/", (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/create", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/getUser/:id", (req, res) => {
    id = req.params.id;
    UserModel.findById(id)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.put("/update/:id", (req, res) => {
    id = req.params.id;
    UserModel.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});