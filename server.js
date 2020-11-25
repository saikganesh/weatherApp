const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const publicDirectoryPath = path.join(__dirname,'./public')
const viewsPath = path.join(__dirname,'./templates/views')
const partialsPath = path.join(__dirname,'./templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=> {
    res.render('index',{
        title:'Weather App',
        name : 'Sai Krishnan G'
    })
})

app.get('/weather',(req,res)=>{
    const {location} = req.query
    
    if(!location)
    {
        return res.send({
            error : 'Enter valid address'
        })
    }

    geocode(location,(error,geocodeData) => {
        if(error)
        {
            return res.send({error})
        }

        forecast(geocodeData,(error,forecastData)=> {
            if(error)
            {
                return res.send({error})
            }

            return res.send({forecastData})
        })
    })
})

app.get('*',(req,res) => {
    res.send('My 404 Page')
})

app.listen('3000',()=> {
    console.log('Listening on port 3000')
})