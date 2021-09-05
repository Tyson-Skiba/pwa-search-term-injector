/* core.js
 *
 * This is the actual express app
 */
const cors = require('cors')
const axios = require('axios')
const express = require('express')

const app = express()

app.use(cors())

app.get('/manifest.json', async (req, res) => {
    try {
        const host = req.get('origin')
        const baseManifestUrl = `${host}/app.webmanifest`
    
        console.log(`Looking for manifest in ${baseManifestUrl}`)

        const queryString = new URLSearchParams(req.query || {}).toString()
        const response = await axios(baseManifestUrl)
        const manifest = response.data

        manifest.start_url = queryString ? `${host}?${queryString}` : host

        res.json(manifest)
    } catch (error) {
        res.status(404).send('Not found')
    }
})

app.get('/version', function (req, res) {
    res.set('Cache-control', 'public, max-age=300')
    res.send('1.0.0')
});

module.exports = {
    app
}
