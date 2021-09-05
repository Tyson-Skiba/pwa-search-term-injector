/* app.js
 *
 * This is used as an entry point for yarn start
 */
const { app } = require('./core')

const port = process.env.PORT || 8082

app.listen(port, () => {
    console.log(`Serving proxy on port ${port}`)
})
