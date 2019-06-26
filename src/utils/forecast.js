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
            callback(undefined, '\nWell, it looks like ' + body.daily.data[0].summary.toLowerCase() +
                '.\nRight now its a balmy ' + body.currently.temperature + ' degrees with a ' +
                body.currently.precipProbability + '% chance of rain.\nThere\'s ' + body.currently.humidity * 100 + '% humidity\n'
                + 'The high for today is ' + body.daily.data[0].temperatureMax + ' degrees and the low is ' + body.daily.data[0].temperatureMin)
        }
    })
}

module.exports =
{
    forecast
}
