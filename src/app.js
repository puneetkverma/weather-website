const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')

console.log(__dirname, path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//define path for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handleBars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Puneet'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Puneet'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Puneet',
        msg: 'I will not help you',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'please provide addres in query params'
        })
    }
    geocode(req.query.address, (error, {latitude, logitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, logitude, (error, forecastData)=> {
            if(error){
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errormsg: 'Help article not found',
        name: 'puneet'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errormsg: 'Page not found',
        name: 'puneet'
    })
})

app.listen(port, () => {
    console.log('server is up on port '+port)
})