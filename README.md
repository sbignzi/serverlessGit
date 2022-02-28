# Offline instructions:
- add serverless-offline and serverless-webpack to plugins
- add profile to provider 
- run:
```
    serverless config credentials --provider aws --key yourAccessKeyId --secret yourSecretAccessKey --profile yourProfileName
```
- npm install serverless-offline --save-dev
- add webpack.config.js file to the root and put inside:
```
    const slsw = require('serverless-webpack');
    module.exports = {
        target: 'node',
        entry: slsw.lib.entries,
        mode: 'none',
    };
 ```
- run:
```
    sls offline start
```
- add x-api-key: generatedToken to your request header

# Deploying using github instructions:

Happy Coding ! :smile: