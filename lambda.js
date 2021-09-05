/* lambda.js
 *
 * This is used as a handler point for aws lambda via serverless
 */
const serverless = require('serverless-http')
const { app } = require('./core')

module.exports.handler = serverless(app);
