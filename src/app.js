const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.get hosts a given webpage on the chosen port, such as /help or /about
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jonathan Warfield'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jonathan Warfield'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Jonathan Warfield'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>
    {
        if (error)
        {
            return res.send({ error })
        }

        forecast.forecast(latitude, longitude, (error, forecastData) =>
        {
            if (error)
            {
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

app.get('/products', (req, res) =>
{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jonathan Warfield',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jonathan Warfield',
        errorMessage: 'Page not found.'
    })
})

//hosts a server on port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})