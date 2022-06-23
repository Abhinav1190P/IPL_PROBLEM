const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/Problem')
const {Teams} = require('./models/teams')
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

app.post('/create-team',async (req,res) => {
    const {team,score} = req.body
    try {
        const newTeam = await Teams.create({
            team,score
        })
    
        if(!newTeam){
            res.status(400).send('Try again')
        }
        res.status(200).send(newTeam)
    } catch (error) {
        res.status(400).send(error.message)
    }  
})


app.get('/teams',async (req,res)=>{
    try {
        const teams = await Teams.find({})
        if(!teams){
            res.status(400).send("Bad request")
        }
        res.status(200).send(teams)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.post('/update-scores', async (req, res)=> {
    const {_id,team,score} = req.body 
    
    try {
        const newDocs = await Teams.updateOne({"_id":_id},{
            $set:{_id:_id,team:team,score:score}
        })
        res.status(200).send(newDocs)
    } catch (error) {
        res.status(400).send(error.message)
    }
})



const port = 3001

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})