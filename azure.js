/* azure.js
 *
 * This is used as an entry point for azure functions
 */
const { createHandler } = require('@chthomos/azure-function-express');
const { app } = require('./core')

module.exports = createHandler(app);
