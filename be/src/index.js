const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log(req)
    res.send('Hello World!')
})
app.post("/save",(req,res) => {
    
    console.log('Got body:', req.body);
    res.sendStatus(200);
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})