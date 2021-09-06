const fs = require('fs');
const path = require('path');
const yaml = require('require-yml');
const { expect } = require('chai');

describe('Provider Api Tests', () => {
    it('Azure Function', () => {
        const functionConfigPath = '../function.json';
        const config = require(functionConfigPath);
        expect(config.scriptFile).to.exist;

        const azureEntry = require(path.resolve('.', config.scriptFile));
        expect(azureEntry).to.exist;

        expect(typeof azureEntry).to.eq('function');
    })

    it('Google Cloud Function', () => {
        const gcfEntry = require('../function');
        expect(gcfEntry).to.haveOwnProperty('app');
    })

    it('AWS Lambda', () => {
        const config = yaml('./serverless.yml');
        expect(config).to.exist;
        expect(config.functions.app.handler).to.exist;

        const [file, entry] = config.functions.app.handler.split('.');
        const lambdaEntry = require(path.resolve('.', file));
        expect(lambdaEntry).to.exist;
        expect(lambdaEntry).to.haveOwnProperty(entry);
    })

    it('Docker', () => {
        const dockerfile = fs.readFileSync('./Dockerfile');
        expect(dockerfile).to.exist;
    })

    it('Heroku', () => {
        const procfile = fs.readFileSync('./Procfile');
        expect(procfile).to.exist;
    })
})