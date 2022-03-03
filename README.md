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
- create directory .github/worflows
- add to .github/worflows:
```
name: Deploy Lambda

on:
  push:
    branches:
      - main

env:
  stage: ${{ secrets.stage }}

jobs:
  deploy:
    name: deploy
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [12.x]
    steps:

    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci 
    - name: Install Serverless Framework
      run: npm install -g serverless
    - name: Serverless AWS authentication
      run: sls config credentials --provider aws --key ${{ secrets.AWS_ACCESS_KEY_ID }} --secret ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    
    - name: env variables diponible
      run: env

    - name: Deploy Lambda functions
      run: sls deploy -s $stage
```
- push to derectory
Happy Coding ! :smile: