import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js'
// App config
const app = express();
const port = process.env.PORT || 3000
const connection_url = 'mongodb+srv://nazmul81:nazmul81@cluster0.ocvyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Middlewares
app.use(express.json());
app.use(Cors);
// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
// API endpoints
app.get('/', (req, res) => {
    res.status(200).send("Hi!");
})

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.sendStatus(500).send(err);
        }
        else {
            res.sendStatus(201).send(data);
        }
    })
})

app.get('/tinder/cards', (req, res) => {
    console.log("ok");
    Cards.find((err, data) => {
        if (err) {
            res.sendStatus(500).send(err);
        }
        else {
            console.log(data);
            res.status(200).send(data);
        }
    })
})


// Listeners

app.listen(port, () => console.log(`listening app from http://localhost:${port}`))