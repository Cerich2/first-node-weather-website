const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Defines path for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set (name,value))
// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('/help',(req,res) => {
    res.render('help',{
        message: 'How may we help you?',
        title: 'Help',
        name: 'Spencer Castro'

    })  
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Spencer Castro', 

    })
})

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Spencer Castro',

    })
})


//here

app.get('/weather',(req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address,(error,{ latitude, longitude, location } ={}) => {
        if (error){
            return res.send( {error} )
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
  
})





app.get('/products',(req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather/*',(req,res) => {
    res.render('errorArticles',{
        title: 'Not found',
        errorMessage: 'Couldn\'t find weather article',
        name: 'Spencer Castro'
    })
})

app.get('/help/*',(req, res) =>{
   res.render('errorArticles',{
       title: 'Not found',
        errorMessage: 'Couldn\'t find help article',
        name: 'Spencer Castro'
   })
})
app.get('/about/*',(req, res) =>{
    res.render('errorArticles',{
       title: 'Not found',
        errorMessage: 'Couldn\'t find about article',
        name: 'Spencer Castro'
    })
})
app.get('*', (req,res)=>{
    res.render('errorArticles',{
        title: '404',
        errorMessage: '404 not found',
        name: 'Spencer Castro'

    })
})
// app.comp
// app.comp/help
// app.comp/about

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
}) 
