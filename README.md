# PWA Manifest Proxy

This proxy service allows applications to serve progressive web application manifests with search terms in the url.

## Usage

Deploy this proxy service, below are various ways that this service can be deployed.

### Requirements

In your application you will need to make the following changes, please note that this assumes that you have deployed this service to `https://pwa-search-term-injector.com.au`

Update your index to serve the new dynamic manifest file.

```diff
<!DOCTYPE html>
+ <script>
+    var link = document.createElement('link');
+    link.href = 'http://localhost:8082/manifest.json' + window.location.search;
+    link.rel = 'manifest';
+    document.getElementsByTagName('head')[0].appendChild(link);
+ </script>
<head>
-    <link rel="manifest" href="app.webmanifest">
</head>
```

Ensure that you have a base `app.webmanifest` in your root.

### Api

__/version__: Get request that will return the semantic version of the service
__/manifest.json__: Get request that will replace the start_url in your root with one that contains search terms

### Express Node App

```bash
yarn serve
```

### Docker

First build the container from the provided image.

```shell
docker build -t pwa-search-term-injector:latest .
```

Then deploy to your server or run locally

```shell
docker run -p 8080:8080 -d pwa-search-term-injector:latest
```

### AWS Lambda (Serverless)

Create an iam user on your account, this user will require cli access and lambda access.
Open the `package.json` and replace ACCESS_KEY and SECRET_KEY with real values.
Open `serverless.yml` and change the region if you would prefer to deploy outside of Australia.

```shell
yarn deploy:aws
```

### Azure Functions

Install the [azure cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)(must be 2.4+) and [func core tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#v2) then login via `az login`.
Create a new azure resource and function once, please replace location with your preferred region and fill in the subscription token.

```shell
az login
az group create --name PwaSearchTermInjector-rg --location australiaeast
az storage account create --name PwaSearchTermInjector-store --location australiaeast --resource-group PwaSearchTermInjector-rg --sku Standard_LRS
az functionapp create --resource-group PwaSearchTermInjector-rg --consumption-plan-location australiaeast --runtime node --runtime-version 12 --functions-version 3 --name PwaSearchTermInjector --storage-account PwaSearchTermInjector-store
```

Deploy the service.

```shell
deploy:azure
```

### Google Cloud Functions

Install the [Google cloud sdk](https://cloud.google.com/sdk/) and create and project for this service.

```shell
yarn deploy:gcf
```

### Heroku

Setup your repository once.

```shell
heroku login -i
heroku create pwa-search-term-injector
```

Then to deploy

```shell
yarn deploy:heroku
```

## Files

.    
├── `app.js`: The entrypoint for yarn start   
├── `azure.js`: The entrypoint for azure functions   
├── `core.js`: The express app that is used by all wrappers   
├── `Dockerfile`: Docker file image that is used to containerise the core app  
├── `function.js`: The entrypoint for google functions   
├── `function.json`: The configuration for azure functions   
├── `lambda.js`: The entry point for aws lambda  
├── `package.json`: Configuration for project  
├── `Procfile`: The configuration for heroku  
├── `serverless.yml`: The configuration for aws lambda  
├── `mock-server`: Demo App  
│   ├── `logo`: Static assets  
│   ├── `index.html`: Demo App index  
│   └── `app.webmanifest`: Base manifest that will have the start_url overwritten  
└── `yarn.lock`: Dependency state file  
