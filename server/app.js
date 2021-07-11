const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "Game_Records"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.send("Hi!")
    console.log("I did it!")
});


app.get('/api/get', (req, res) => {
    const sqlInsert = "SELECT * FROM Top_Records ORDER BY player_score DESC";
    db.query(sqlInsert, (err, result)=> {
        console.log(result)
        res.send(result)

    })

});


app.post('/api/post', (req, res)=> {

    // request data from client:
    const playerName = req.body.player_name;
    const playerScore = req.body.player_score;

    const sqlInsert = "INSERT INTO Top_Records (player_name, player_score) VALUES (?, ?);"
    db.query(sqlInsert, [playerName, playerScore], (err, result)=> {
        console.log(result);
    })
})




// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
