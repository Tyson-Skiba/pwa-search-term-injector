/* core.js
 *
 * This is the actual express app
 */
const https = require('https');
const cors = require('cors')
const axios = require('axios')
const express = require('express')

const app = express()

app.use(cors())

const getManifest = async (hostBase, query, forceHttp) => {
    const host = forceHttp ? hostBase.replace('https', 'http') : hostBase
    const baseManifestUrl = `${host}/app.webmanifest`

    console.log(`Looking for manifest in ${baseManifestUrl}`)

    const queryString = new URLSearchParams(query || {}).toString()

    const httpsAgent = new https.Agent({  
        rejectUnauthorized: false
    });

    const response = await axios(baseManifestUrl, { httpsAgent })
    const manifest = response.data

    manifest.start_url = queryString ? `${host}?${queryString}` : host

    if (manifest.icons && manifest.icons.length) manifest.icons = manifest.icons.map(icon => {
        if (!icon || !icon.src || icon.src.startsWith('htt')) return icon;
        if (icon && icon.src) icon.src = `${host}/${icon.src}`;

        return icon;
    })

    const appRef = {
        "platform": "webapp",
        // "url": `${host}/manifest.json${queryString ? `?${queryString}` : '' }`,
        "url": `${host}/manifest.json`
    }

    if (manifest.related_applications && manifest.related_applications.length) {
        manifest.related_applications.push(appRef)
    } else {
        manifest.related_applications = [appRef]
    }

    return manifest
}

app.get('/manifest.json', async (req, res) => {
    try {
        const host = req.get('origin')
        const manifest = await getManifest(host, req.query)

        res.json(manifest)
    } catch (error) {
        /* fallback to http */
        /* try {
            const host = req.get('origin')
            const manifest = await getManifest(host, req.query, true)
    
            res.json(manifest)
        } catch (finalError) {
            res.status(404).send('Not found')
        } */
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
