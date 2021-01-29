const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbGetById, save, getAll} = require('./dataBaseservice');

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(getAll())
})
app.get('/:id', (req, res) => {
    console.log(req.params.id)
    res.send(dbGetById(req.params.id))
})
app.post("/", (req,res) => {
    console.log('Got body:', req.body);
    save(req.body);
    res.json(req.body).status(200);
});
app.put('/:id', (req, res) => {
});
app.delete('/:id',(req,res) => {

});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
