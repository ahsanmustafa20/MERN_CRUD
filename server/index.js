require("dotenv").config();
const expresss = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');


const app = expresss();
app.use(cors());

app.use(expresss.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected"))
.catch((err) => console.log(err));

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
    const id = req.params.id;
    UserModel.findById(id)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})



app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted", user: deletedUser });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Delete failed", error: err.message });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});