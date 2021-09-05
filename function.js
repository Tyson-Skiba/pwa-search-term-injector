/* function.js
 *
 * This is used as an entry point for google cloud functions
 */
const { app } = require('./core')

const port = 5555

app.listen(port, () => {
    console.log('Serving proxy')
})

module.exports = {
    app
};
