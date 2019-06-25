const request = require('request')

const forecast = (latitude, longitude, callback) =>
{
    const url = 'https://api.darksky.net/forecast/5566b613b1c9ba42dd4ed13e6a83cd85/' + latitude + ',' + longitude
    request({ url, json: true /*parsed as json*/}, (error, { body }) =>
    {
        if(error)
        {
            callback('Unable to connect to weather services', undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location', undefined)
        }
        else
        {
            callback(undefined, '\nWell, it looks like it\'s been mostly ' + body.daily.data[0].summary.toLowerCase() +
                ' And right now its a balmy ' + body.currently.temperature + ' degrees with a ' +
                body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports =
{
    forecast
}
